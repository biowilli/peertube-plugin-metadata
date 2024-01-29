const { getParser, setParser } = require("./../ParserHelper.js");

const initVideoUpdateHooks = (
  settingsManager,
  syncHelper,
  registerHook,
  storageManager,
  mediainfoMetadataDAO,
  syncedMetadataDAO,
  metadataDAO
) => {
  // Store data associated to this video
  registerHook({
    target: "action:api.video.updated",
    handler: async ({ video, body }) => {
      console.log("action:api.video.updated");
      if (!body.pluginData) return;
      var pluginVideoData = body.pluginData;
      var videoId = video.id;
      console.log("body");
      console.log(body);
      console.log("body.pluginData");
      console.log(body.pluginData);

      // get JSON from DB
      // body.pluginData
      // update
      // JSON format
      // pluginData parsen

      const mediainfoMetaData = await metadataDAO.findMetadata(videoId);
      console.log("mediainfoMetaData", mediainfoMetaData);

      const standardVideoDataSynced = await syncHelper.syncStandardVideoData(
        body,
        pluginVideoData
      );

      var anaylsedMetadataJSON = JSON.parse(mediainfoMetaData[0][0].metadata);

      //TODO setParser
      var metadataJSON = JSON.parse(mediainfoMetaData[0][0].parsed_metadata);
      console.log("JSON compare");
      console.log(anaylsedMetadataJSON);
      console.log(metadataJSON);

      //formdata
      const setting = await settingsManager.getSetting("form");
      if (!setting) {
        console.log('Error: "setting" is undefined or null');
        return;
      }

      let formDataJSON;
      try {
        formDataJSON = JSON.parse(setting.replace(/'/g, '"'));
      } catch (error) {
        console.error("Error parsing JSON in setting:", error);
        return;
      }
      var parsedData = await setParser(anaylsedMetadataJSON, formDataJSON);
      console.log(parsedData);
      //should I use the parsed one or the synced one? getParser worked not as it should
      const result = await syncHelper.syncMetadata(
        metadataJSON,
        standardVideoDataSynced
      );
      console.log("result12121221");
      console.log(result);
      var metadataData = JSON.stringify(result);
      await syncedMetadataDAO.addSyncedMetadata(metadataData, videoId);

      //cache
      /*       
      await storageManager.storeData("metadata-" + videoId + "-" + 0, result); 
      */
    },
  });
};

module.exports = {
  initVideoUpdateHooks,
};
