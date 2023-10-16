//TODO createdby
async function register({
  registerHook,
  storageManager,
  getRouter,
  videoCategoryManager,
  registerSetting
}) {
    const { initRegisterSettings }  = require("./server/settings.js");
    const { initCategoryController }  = require("./server/controller/category.js");
    const { initCreatorController }  = require("./server/controller/creator.js");
    const { initGenreController } = require("./server/controller/genre.js");
    const { initOrganizationController }  = require("./server/controller/organization.js");
    const { EBUDefaults }  = require("./model/EbuDefaults.js");
    initRegisterSettings(registerSetting);

    var router = getRouter();
    initCategoryController(router, videoCategoryManager);
    initCreatorController(router, storageManager);
    initGenreController(router, storageManager);
    initOrganizationController(router, storageManager);

    // Store data associated to this video
    registerHook({
      target: "action:api.video.updated",
      handler: ({ video, body }) => {
        if (!body.pluginData) return;

        console.log("bodyData", body);
        console.log("should be mapped to", body.pluginData);

        var pluginData = syncStandardVideoEditDataToPluginData(body);
        var videoEBUData = mergeFormDataToEbuDefaults(pluginData, EBUDefaults.values)
        console.log("asgdasfxasdcvsadv.result", videoEBUData);
        console.log("pluginData will be be stored:", videoEBUData);

        if(body.pluginData['dates.publicationHistory'] === "true"){      
           storageManager.storeData("metadata-" + video.id, videoEBUData); //TODO: OM dort eine Versionsnummer anführen? Wie dann die Versionsnummer suchen?
           return;
        }

        storageManager.storeData("metadata-" + video.id, videoEBUData);
      }
    });

    // Add your custom value to the video, so the client autofill your field using the previously stored value
    registerHook({
      target: "filter:api.video.get.result",
      handler: async (video) => {
        if (!video) return video;
        console.log("result video id", video.id);

        if (!video.pluginData) video.pluginData = {};
        var storedData = await storageManager.getData("metadata-" + video.id);
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
      },
    });
  }

  function syncStandardVideoEditDataToPluginData(body) {

    var videoEditData = body;
    var metadataPlugin = body.pluginData;
    
    // Check if the required data is present
    if (!videoEditData || !metadataPlugin) {
      console.error("Invalid input: Video Edit data or Metadata Plugin is missing.");
      return;
    }
  
    // Synchronize the data
    metadataPlugin['title.title'] = videoEditData.name;
    metadataPlugin['description.text'] = videoEditData.description;
    metadataPlugin['description.tags'] = videoEditData.tags;
    metadataPlugin['videoInformation.language'] = videoEditData.language;
    metadataPlugin['videoInformation.category'] = videoEditData.category;
  
    //noch keine Zuordnung
    //videoEditData.licence
    //videoEditData.support 
    //videoEditData.channelId
    //videoEditData.privacy
    //videoEditData.nsfw
    //videoEditData.waitTranscoding
    //videoEditData.commentsEnabled
    //videoEditData.downloadEnabled
  
    return metadataPlugin;
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


// Umwandlung in eindimensionales JSON
function flattenJSON(obj, prefix = '') {
  let result = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        let flattenedObj = flattenJSON(obj[key], newKey);
        result = { ...result, ...flattenedObj };
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  console.log("result flattenJSON in flattenJSON", result);
  return result;
}

// Umwandlung in nested JSON
function unflattenJSON(flatJson) {
  console.log("flattenJSON in unflattenJSON", flatJson);
  const nestedJson = {};

  for (const key in flatJson) {
    if (key.includes(".")) {
      const nestedKeys = key.split(".");
      let currentNestedJson = nestedJson;

      for (let i = 0; i < nestedKeys.length - 1; i++) {
        const nestedKey = nestedKeys[i];

        if (!currentNestedJson[nestedKey]) {
          currentNestedJson[nestedKey] = {};
        }

        currentNestedJson = currentNestedJson[nestedKey];
      }

      currentNestedJson[nestedKeys[nestedKeys.length - 1]] =
        flatJson[key] !== undefined ? flatJson[key] : "";
    } else {
      nestedJson[key] = flatJson[key] !== undefined ? flatJson[key] : "";
    }
  }
  console.log("result flattenJSON in unflattenJSON", nestedJson);
  return nestedJson;
}

module.exports = {
  register,
  unregister,
};

async function unregister() {
  return;
}
