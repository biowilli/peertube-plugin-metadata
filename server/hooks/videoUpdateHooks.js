const { getParser, setParser } = require("./../ParserHelper.js");

const initVideoUpdateHooks = (
  registerHook,
  settingsManager,
  mergeHelper,
  syncedMetadataDAO,
  metadataDAO
) => {
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

      const mediainfoMetaData = await metadataDAO.findMetadata(videoId);
      console.log("mediainfoMetaData", mediainfoMetaData);

      const standardVideoDataSynced = await mergeHelper.mergeStandardVideoData(
        body,
        pluginVideoData
      );

      var anaylsedMetadataJSON = JSON.parse(mediainfoMetaData[0][0].metadata);
      console.log("JSON compare");
      console.log(anaylsedMetadataJSON);

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
      console.log("parsedData", parsedData);

      const result = await mergeHelper.mergeMetadata(
        anaylsedMetadataJSON,
        standardVideoDataSynced
      );
      console.log("result12121221");
      console.log(result);
      var metadataData = JSON.stringify(result);
      await syncedMetadataDAO.addSyncedMetadata(metadataData, videoId);
    },
  });
};

module.exports = {
  initVideoUpdateHooks,
};
