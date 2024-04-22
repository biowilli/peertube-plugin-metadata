const initVideoResultHooks = (registerHook, syncedMetadataDAO) => {
  registerHook({
    target: "filter:api.video.get.result",
    handler: async (video) => {
      console.log("filter:api.video.get.result triggered");

      if (!video) return video;
      if (!video.pluginData) video.pluginData = {};
      var videoId = video.dataValues.id;

      var syncedMetadata = await syncedMetadataDAO.findSyncedMetadata(
        videoId,
        undefined
      );
      console.log("syncedMetadata", syncedMetadata);
      if (syncedMetadata === null || undefined) {
        console.log("syncedMetadata is null or not defined");
        return video;
      }

      if (syncedMetadata[0][0].metadata === null || undefined) {
        console.log("metadata in syncedMetadata is null or not defined");
        return video;
      }

      video.pluginData = JSON.parse(syncedMetadata[0][0].metadata);
      return video;
    },
  });
};

module.exports = {
  initVideoResultHooks,
};
