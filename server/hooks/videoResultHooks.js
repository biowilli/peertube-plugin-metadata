const initVideoResultHooks = (
  registerHook,
  storageManager,
  creatorDAO,
  organizationDAO,
  syncedMetadataDAO
) => {
  registerHook({
    target: "filter:api.video.get.result",
    handler: async (video) => {
      console.log("filter:api.video.get.result");
      console.log(video);

      if (!video) return video;
      if (!video.pluginData) video.pluginData = {};
      var videoId = video.dataValues.id;

      var syncedMetadata = syncedMetadataDAO.findSyncedMetadata(videoId);

      //cache
      /*       
      var storedData = await storageManager.getData(
        "metadata-" + videoId + "-" + 0
      ); 
      */

      if (storedData === null || undefined) {
        console.log("storedData is null or not defined");
        return video;
      }

      if (syncedMetadata === null || undefined) {
        console.log("syncedMetadata is null or not defined");
        return video;
      }

      //TODO: use DAOs for everything
      video.pluginData = syncedMetadata;

      //video.pluginData = storedData;
      return video;
    },
  });
};

module.exports = {
  initVideoResultHooks,
};
