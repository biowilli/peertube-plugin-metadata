const { syncMetaDataDAO } = require("./../VideoHelper.js");

const initVideoUploadHooks = (
  mediaInfo,
  mediainfoEBU,
  ffprobe,
  registerHook,
  peertubeVideosHelpers,
  mediainfoMetadataDAO,
  mediainfoMetadataEBUDAO,
  ffprobeMetadataDAO,
  metadataEBUDefaultDAO,
  videoMetadataDAO
) => {
  registerHook({
    target: "action:api.video.uploaded",
    handler: (data) =>
      syncMetaDataDAO(
        mediaInfo,
        mediainfoEBU,
        ffprobe,
        data.video.dataValues.id,
        peertubeVideosHelpers,
        mediainfoMetadataDAO,
        mediainfoMetadataEBUDAO,
        ffprobeMetadataDAO,
        metadataEBUDefaultDAO,
        videoMetadataDAO
      ),
  });
};

module.exports = {
  initVideoUploadHooks,
};
