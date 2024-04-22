const initVideoUpdateHooks = (
  registerHook,
  mergeHelper,
  syncedMetadataDAO,
  metadataDAO
) => {
  registerHook({
    target: "action:api.video.updated",
    handler: async ({ video, body }) => {
      console.log("action:api.video.updated triggered");

      if (!body.pluginData) return;
      var pluginVideoData = body.pluginData;
      var videoId = video.id;
      // Mediainfo data and standard video data always overwrite the metadata so that it cannot be changed
      // Alternative for Metainfo data would be that I check whether there is already a data set in syncedMetadataDAO and if so,
      // merge the previous data and dont mergeMetadata

      const standardVideoDataSynced = await mergeHelper.mergeStandardVideoData(
        body,
        pluginVideoData
      );

      const mediainfoMetaData = await metadataDAO.findMetadata(videoId);
      var anaylsedMetadataJSON = JSON.parse(mediainfoMetaData[0][0].metadata);
      const result = await mergeHelper.mergeMetadata(
        anaylsedMetadataJSON,
        standardVideoDataSynced
      );

      await syncedMetadataDAO.addSyncedMetadata(
        JSON.stringify(result),
        videoId
      );
    },
  });
};

module.exports = {
  initVideoUpdateHooks,
};
