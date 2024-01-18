const { syncMetaDataDAO } = require("./../VideoHelper.js");

const initVideoUploadHooks = (
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
