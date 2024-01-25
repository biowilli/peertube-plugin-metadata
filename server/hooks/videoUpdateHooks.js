const { syncMetaDataDAO } = require("./../VideoHelper.js");

const initVideoUpdateHooks = (
  mediaInfo,
  mediainfoEBU,
  ffprobe,
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
              mediaInfo,
              mediainfoEBU,
              ffprobe,
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
                syncAndUpdate(
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
                mediaInfo,
                mediainfoEBU,
                ffprobe,
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
                  syncAndUpdate(
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
              syncAndUpdate(
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

  async function syncAndUpdate(
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

    mediainfoMetaData = await mediainfoMetadataDAO.findMediainfoMetadata(
      videoMetaData.fk_mediainfo_metadata_id
    );
    console.log(
      "was ist im mediainfoMetaData",
      videoMetaData.fk_metadata_ebu_default_id
    );
    var userId = video.VideoChannel.Account.dataValues.userId;
    await syncHelper
      .sync(
        body,
        mediainfoMetaData.mediainfo,

        pluginVideoData,
        EBUDefaults.values,
        userId
      )
      .then(async (result) => {
        console.log("CompleteSync", result);
        console.log(body);
        console.log(mediainfoMetaData);

        //findMediainfoMetadata
        //videoMetaData.fk_mediainfo_metadata_ebu_id

        mediainfoEbuDefaultsId =
          await metadataEBUDefaultDAO.modifyMediainfoMetadata(result);

        await storageManager.storeData(
          "metadata-" + video.id + "-" + 0,
          result
        );
      });

    //TODO: use also metadataDAO;
  }
};

module.exports = {
  initVideoUpdateHooks,
};
