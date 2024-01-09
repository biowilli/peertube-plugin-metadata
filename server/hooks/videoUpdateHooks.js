const { getPath } = require("./../VideoHelper.js");

const initVideoUpdateHooks = (
  EBUDefaults,
  syncHelper,
  peertubeVideosHelpers,
  registerHook,
  storageManager,
  mediainfoMetadataDAO,
  videoMetadataDAO
) => {
  // Store data associated to this video
  registerHook({
    target: "action:api.video.updated",
    handler: async ({ video, body }) => {
      if (!body.pluginData) return;
      var pluginVideoData = body.pluginData;
      var videoMetaData = await videoMetadataDAO.findVideoMetadataByVideoId(
        video.id
      );

      var mediainfoMetaData;
      if (pluginVideoData["analyseMediainfo"]) {
        try {
          //TODO: not every upload and every update should intstanzaite a class
          const MediaInfo = require("./../tools/Mediainfo.js");
          const mediaInfo = new MediaInfo();
          const path = await getPath(videoId, peertubeVideosHelpers);
          const result = await mediaInfo.analyzeVideo(path);
          console.log("mediainfoStreams");
          console.log(result);
          mediainfoMetaData =
            await mediainfoMetadataDAO.modifyMediainfoMetadata(
              videoMetaData.fk_mediainfo_metadata_id,
              JSON.stringify(result)
            );
          console.log("pluginVideoData[true]", mediainfoMetaData);
        } catch (error) {
          console.error("Error in mediainfo: ", error);
        }
      }
      if (!mediainfoMetaData) {
        mediainfoMetaData = await mediainfoMetadataDAO.findMediainfoMetadata(
          videoMetaData.fk_mediainfo_metadata_id
        );
      }

      var userId = video.VideoChannel.Account.dataValues.userId;
      const result = await syncHelper.makeCompleteSync(
        body,
        mediainfoMetaData.mediainfo,
        pluginVideoData,
        EBUDefaults.values,
        userId
      );

      console.log("CompleteSync", result);

      //trigger reset
      pluginVideoData["analyseMediainfo"] = false;

      //TODO: use also metadataDAO;
      await storageManager.storeData("metadata-" + video.id + "-" + 0, result);
    },
  });
};

module.exports = {
  initVideoUpdateHooks,
};
