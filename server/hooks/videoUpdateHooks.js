const { syncMetaDataDAO } = require("./../VideoHelper.js");

const initVideoUpdateHooks = (
  EBUDefaults,
  syncHelper,
  peertubeVideosHelpers,
  registerHook,
  storageManager,
  mediainfoMetadataDAO,
  mediainfoMetadataEBUDAO,
  ffprobeMetadataDAO,
  metadataEBUDefaultDAO,
  videoMetadataDAO
) => {
  // Store data associated to this video
  registerHook({
    target: "action:api.video.updated",
    handler: async ({ video, body }) => {
      console.log("action:api.video.updated");
      if (!body.pluginData) return;
      var pluginVideoData = body.pluginData;
      if (pluginVideoData["analyseMediainfo"]) {
        console.log("syncMetaDataDAO");
        await videoMetadataDAO
          .deleteVideoMetadata(video.id)
          .then(async (deleted) => {
            console.log("syncMetaDataDAO because triggered");
            await syncMetaDataDAO(
              video.id,
              peertubeVideosHelpers,
              mediainfoMetadataDAO,
              mediainfoMetadataEBUDAO,
              ffprobeMetadataDAO,
              metadataEBUDefaultDAO,
              videoMetadataDAO
            ).then((resolvedVideoMetaData) => {
              var videoMetaData = resolvedVideoMetaData;
              if (videoMetaData != undefined) {
                makeProcess(
                  videoMetaData,
                  mediainfoMetadataDAO,
                  video,
                  syncHelper,
                  storageManager,
                  body,
                  EBUDefaults,
                  pluginVideoData
                );
              }
            });
          });

        pluginVideoData["analyseMediainfo"] = false;
      } else {
        videoMetadataDAO
          .findVideoMetadataByVideoId(video.id)
          .then(async (resolvedVideoMetaData) => {
            console.log("resolvedVideoMetaData", resolvedVideoMetaData);
            if (resolvedVideoMetaData == undefined) {
              console.log("syncMetaDataDAO because not found");
              await syncMetaDataDAO(
                video.id,
                peertubeVideosHelpers,
                mediainfoMetadataDAO,
                mediainfoMetadataEBUDAO,
                ffprobeMetadataDAO,
                metadataEBUDefaultDAO,
                videoMetadataDAO
              ).then((resolvedVideoMetaData) => {
                var videoMetaData = resolvedVideoMetaData;
                if (videoMetaData != undefined) {
                  makeProcess(
                    videoMetaData,
                    mediainfoMetadataDAO,
                    video,
                    syncHelper,
                    storageManager,
                    body,
                    EBUDefaults,
                    pluginVideoData
                  );
                }
              });
            } else {
              videoMetaData = resolvedVideoMetaData;
              makeProcess(
                videoMetaData,
                mediainfoMetadataDAO,
                video,
                syncHelper,
                storageManager,
                body,
                EBUDefaults,
                pluginVideoData
              );
            }
          });
      }
    },
  });

  async function makeProcess(
    videoMetaData,
    mediainfoMetadataDAO,
    video,
    syncHelper,
    storageManager,
    body,
    EBUDefaults,
    pluginVideoData
  ) {
    console.log("videoMetaData not undefined anymore");
    console.log(videoMetaData);
    // das ist vermutlich auch ein promise
    mediainfoMetaData = await mediainfoMetadataDAO.findMediainfoMetadata(
      videoMetaData.fk_mediainfo_metadata_id
    );
    var userId = video.VideoChannel.Account.dataValues.userId;
    const result = await syncHelper.makeCompleteSync(
      body,
      mediainfoMetaData.mediainfo,
      pluginVideoData,
      EBUDefaults.values,
      userId
    );

    console.log("CompleteSync", result);
    //TODO: use also metadataDAO;
    await storageManager.storeData("metadata-" + video.id + "-" + 0, result);
    console.log("ich bin hier 2");
  }
};

module.exports = {
  initVideoUpdateHooks,
};
