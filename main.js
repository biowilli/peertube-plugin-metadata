//TODO createdby
//TODO check if Standard Video Data require works: language, Beschreibung

async function register({
  registerHook,
  storageManager,
  getRouter,
  videoLanguageManager,
  videoLicenceManager,
  videoCategoryManager,
  peertubeHelpers,
  registerSetting
}) {
    const { initRegisterSettings }  = require("./server/settings.js");
    const { initCategoryController }  = require("./server/controller/category.js");
    const { initLanguageController }  = require("./server/controller/language.js");
    const { initLicenceController }  = require("./server/controller/licence.js");
    
    const { initCreatorController }  = require("./server/controller/creator.js");
    const { initGenreController } = require("./server/controller/genre.js");
    const { initOrganizationController }  = require("./server/controller/organization.js");
    const { initVideoController }  = require("./server/controller/video.js");
    const { initMetadataController }  = require("./server/controller/metadata.js");
    const { EBUDefaults }  = require("./model/EbuDefaults.js");
    initRegisterSettings(registerSetting);
    const host = peertubeHelpers.config.getWebserverUrl();

    var router = getRouter();
    initLanguageController(router, videoLanguageManager);
    initLicenceController(router, videoLicenceManager);
    initCategoryController(router, videoCategoryManager);
    initCreatorController(router, storageManager);
    initGenreController(router, storageManager);
    initOrganizationController(router, storageManager);
    initVideoController(router, storageManager);
    initMetadataController(router, storageManager);

    // Store data associated to this video
    registerHook({
      target: "action:api.video.updated",
      handler: ({ video, body }) => {
        if (!body.pluginData) return;

        
//body bekommt man die standard video data
        var synchronizedStandardVideoData = syncStandardVideoEditDataToPluginData(body);
        console.log("synchronizedStandardVideoData", synchronizedStandardVideoData);

        var synchronizedffprobeData = syncffprobeDataToPluginData(synchronizedStandardVideoData, video.dataValues.id, storageManager);
        console.log("synchronizedffprobeData", synchronizedffprobeData);
        var videoEBUData = mergeFormDataToEbuDefaults(synchronizedffprobeData, EBUDefaults.values);
        console.log("videoEBUData", videoEBUData);

        console.log("asgdasfxasdcvsadv.result", videoEBUData);
        console.log("pluginData will be be stored:", videoEBUData);
        var videoId = video.id;
   
            fetch(`${host}/plugins/metadata/1.2.1/router/video/${videoId}`)
              .then(response => {

                if (!response.ok) {
                  console.error('Fehler beim Abrufen der publicationHistoryVersion');
                }

                return response.json()
              })
              .then(publicationHistoryVersion => {
                var newVersion = publicationHistoryVersion.value;
                if (!isNaN(newVersion)) {

                  if (body.pluginData['dates.publicationHistory'].value === "true"){
                    newVersion = publicationHistoryVersion.value + 1;
                  }

                  setVideoMetadata(videoId, newVersion, videoEBUData, storageManager);
                  setVideoVersion(videoId, newVersion, host)

                } else {
                    var newVersion = 0;
                    console.log("last publicationHistoryVersion was ", publicationHistoryVersion.value,  ". Setting newVersion to 0.");
                    setVideoMetadata(videoId, newVersion, videoEBUData, storageManager);
                    setVideoVersion(videoId, newVersion, host)
                }
                })
                .catch(error => {
                  console.error('Error setting video version2:', error);
                }); 
      }
    });

    async function setVideoMetadata(videoId, newVersion, metadata, storageManager){
      console.log("will set video metadata");
      await storageManager.storeData("metadata-" + videoId + "-" + newVersion, metadata);
      console.log("video metadata stored");
    }

    function setVideoVersion(videoId, newVersion, host){
      fetch(`${host}/plugins/metadata/1.2.1/router/video/${videoId}/version`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({value: newVersion}),
      })
        .then(response => response.json())
        .then(data => {
          console.log("Video version successfully set:", data.message);
        })
        .catch(error => {
          console.error('Error setting video version1:', error);
        });
    }

    // Add your custom value to the video, so the client autofill your field using the previously stored value
    registerHook({
      target: "filter:api.video.get.result",
      handler: async (video) => {
        await fetch(`${host}/plugins/metadata/1.2.1/router/video/${video.dataValues.id}/version`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(async data => {
            if (!video) return video;
            if (!video.pluginData) video.pluginData = {};

            var currentPublicationHistoryVersion = data.version;

            //wenn  passiert wenn latest aufgewählt wurde
            if (currentPublicationHistoryVersion == -1){}

            console.log("welche version wird geladen:", currentPublicationHistoryVersion);

            var storedData = await storageManager.getData("metadata-" + video.dataValues.id + '-' + currentPublicationHistoryVersion);
            if (storedData === null || undefined){
              return video; 
            }
    
            result = {};
            for (let key in storedData) {
              console.log(key);
              if (key == 'creator'){
                var existingCreators = await storageManager.getData("creator");
                if (existingCreators === null || existingCreators ===  undefined || existingCreators.data === null || existingCreators.data ===  undefined){
                  continue;
                }
                storedData[key].map(async id => {
                  var creator = existingCreators.data.filter(creator => creator.id === id);
                  if (creator.length > 0){
                    var creatorKey = 'creator-' + creator[0].id + '-' + creator[0].creatorname;
                    result[creatorKey] = 'true';
                  }
                })
                continue;
              }
    
              if (key == 'contributor'){
                var existingContributors = await storageManager.getData("creator");
                if (existingContributors === null || existingContributors === undefined || existingContributors.data === null || existingContributors.data === undefined){
                  continue;
                }
                storedData[key].map(async id => {
                  var contributor = existingContributors.data.filter(contributor => contributor.id === id);
                  if (contributor.length > 0){
                    var contributorKey = 'contributor-' + contributor[0].id + '-' + contributor[0].creatorname;
                    result[contributorKey] = 'true';
                  }
                })
                continue;
              }
    
              if (key == 'organization'){
                var existingOrganizations = await storageManager.getData("organization");
                if (existingOrganizations === null || existingOrganizations === undefined || existingOrganizations.data === null || existingOrganizations.data === undefined ){
                  continue;
                }
                storedData[key].map(async id => {
                  var organization = existingOrganizations.data.filter(organization => organization.id === id);
                  if (organization.length > 0){
                    var organizationKey = 'organization-' + organization[0].id + '-' + organization[0].name;
                    console.log(organizationKey);
                    result[organizationKey] = 'true';
                  }
                })
                continue;
              }
    
              result[key] = storedData[key].value || '';
            };
            video.pluginData = result;
            
            return video;
          })
          .catch(error => {
            console.error('Fehler beim Bekommen der Videoversion:', error);
          });

          return video;
      },
    });
  }
  function syncStandardVideoEditDataToPluginData(body) {

    var videoEditData = body;
    var metadataPlugin = body.pluginData;
    console.log("metadataPlugin123123123", metadataPlugin);

    if (!videoEditData) {
      console.error("Invalid input: Video Edit Data is missing.");
      return;
    }

    if (!metadataPlugin) {
      console.error("Invalid input: Metadata Plugin is missing.");
      return;
    }

    // Synchronize the data
    console.log("Synchronize the standard VideoData", metadataPlugin)
    metadataPlugin['title.title'] = videoEditData.name;
    metadataPlugin['description.text'] = videoEditData.description;
    metadataPlugin['description.tags'] = videoEditData.tags;

    metadataPlugin['videoInformation.language'] = videoEditData.language;
    metadataPlugin['videoInformation.category'] = videoEditData.category;

    metadataPlugin['rights.copyright.rightId'] = videoEditData.licence;

    //TODO metadataPlugin['rights.copyright.rightId'] = videoEditData.licence;
  
    //noch keine Zuordnung
    //videoEditData.support 
    //videoEditData.channelId
    //videoEditData.privacy
    //videoEditData.nsfw
    //videoEditData.waitTranscoding
    //videoEditData.commentsEnabled
    //videoEditData.downloadEnabled
  
    return metadataPlugin;
  }

  function syncffprobeDataToPluginData(synchronizeData, videoId, storageManager) {
    console.log(synchronizeData);

    var ffprobeData = storageManager.getData("ffprobe-" + videoId);

    if (!synchronizeData) {
      console.error("Invalid input: ffprobe data or Metadata Plugin is missing.");
      return;
    }

    if (!ffprobeData) {
      console.error("Invalid input: ffprobe is missing.");
      return;
    }

    console.log("Synchronize this ffprobe Data", ffprobeData);
 
    // Synchronize the data
    synchronizeData['technicaldata.videoFormat'] = "*";
    synchronizeData['technicaldata.videoFormat.definition'] = "*";
    synchronizeData['technicaldata.videoFormat.aspectratio'] = "*";
    synchronizeData['technicaldata.videoFormat.width'] = "*";
    synchronizeData['technicaldata.videoFormat.height'] = "*";
    synchronizeData['technicaldata.videoFormat.videoEncoding'] = "*";
    synchronizeData['technicaldata.videoFormat.frameRate'] = "*";
    synchronizeData['technicaldata.videoFormat.colorSpace'] = "*";
    synchronizeData['technicaldata.videoFormat.chromaSubsampling'] = "*";
    synchronizeData['technicaldata.videoFormat.encoderProfile'] = "*";
    synchronizeData['technicaldata.videoFormat.bitrate'] = "*";
    synchronizeData['technicaldata.videoFormat.bframes'] = "*";
    synchronizeData['technicaldata.videoFormat.trackId'] = "*";
    synchronizeData['technicaldata.videoFormat.trackName'] = "*";
    synchronizeData['technicaldata.audioFormat'] = "*";
    synchronizeData['technicaldata.audioFormat.encoding'] = "*";
    synchronizeData['technicaldata.audioFormat.trackConfiguration'] = "*";
    synchronizeData['technicaldata.audioFormat.audioChannels'] = "*";
    synchronizeData['technicaldata.audioFormat.trackId'] = "*";
    synchronizeData['technicaldata.audioFormat.trackName'] = "*";
    synchronizeData['technicaldata.audioFormat.encoderProfile'] = "*";
    synchronizeData['technicaldata.audioFormat.bitrate'] = "*";
    synchronizeData['technicaldata.audioFormat.samplingRate'] = "*";
    synchronizeData['technical.datacontainer'] = "*";
    synchronizeData['technicaldata.startDate'] = "*";
    synchronizeData['technicaldata.endDate'] = "*";
    synchronizeData['technicaldata.duration'] = "*";
    synchronizeData['technicaldata.created'] = "*";

    return synchronizeData;
  }

  function mergeFormDataToEbuDefaults(formData, EBUDefaults) {
    // Reset
    EBUDefaults['creator'] = [];
    EBUDefaults['contributor'] = [];
    EBUDefaults['organization'] = [];

    // Get the current date and time in ISO format
    const currentDate = new Date().toISOString();
    // Iterate through the form data
    for (const key in formData) {
      // Check if the key exists in the formData object and it is not undefined
      if (key in formData && formData[key] !== undefined) {

        if (EBUDefaults.hasOwnProperty(key)) {

          // Check if the value in the form data has changed
          if (formData[key] !== EBUDefaults[key].value) {
            // Update the value in EBUDefaults
            EBUDefaults[key].value = formData[key];
          // Set the last modified date to the current date and time
            EBUDefaults[key].lastModified = currentDate;
          } 

        } else {

          if (key.startsWith('creator-')){
              var creatorId = extractId(key);
              if (!EBUDefaults['creator'].includes(creatorId) && formData[key] == 'true') {
                EBUDefaults['creator'].push(creatorId);
            
            }
          }

          if (key.startsWith('contributor-')){
            var contributorId = extractId(key);
            if (!EBUDefaults['contributor'].includes(contributorId) && formData[key] == 'true') {
              EBUDefaults['contributor'].push(contributorId);      
          }
        }

          if (key.startsWith('organization-')){
            var organizationId = extractId(key);
            if (!EBUDefaults['organization'].includes(organizationId) && formData[key] == 'true') {
              EBUDefaults['organization'].push(organizationId);
          }
        }
          console.log(key, "Property does not exist, in ebuDefaults:");
        }
      }
    }
  
    console.log("not set EBUDefaults values:");
    console.log("");
    for (const key in EBUDefaults.values) {
      const item = EBUDefaults.values[key];
      if (typeof item === 'object' && 'value' in item && item.value === '') {
          console.log(`${key}' does not have a value set in EBUDefaults key '.`);
      } else if (Array.isArray(item) && item.length === 0) {
          console.log(`${key}' does not have a value set in EBUDefaults key '.`);
      }
  }

    return EBUDefaults;
  }
  
  function extractId(key) {
    const idParts = key.split("-");
    const extractedId =
      idParts[1] +
      "-" +
      idParts[2] +
      "-" +
      idParts[3] +
      "-" +
      idParts[4] +
      "-" +
      idParts[5];
    return extractedId;
  }  


  
module.exports = {
  register,
  unregister,
};

async function unregister() {
  return;
}
