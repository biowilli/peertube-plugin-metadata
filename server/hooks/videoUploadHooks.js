const { getPath } = require("./../VideoHelper.js");
const initVideoUploadHooks = (
  registerHook,
  peertubeVideosHelpers,
  storageManager,
  settingsManager,
  mediainfoMetadataDAO,
  mediainfoMetadataEBUDAO,
  ffprobeMetadataDAO,
  metadataEBUDefaultDAO,
  videoMetadataDAO
) => {
  registerHook({
    target: "action:api.video.uploaded",
    handler: (data) =>
      handlerVideoUpload(
        data.video.dataValues.id,
        peertubeVideosHelpers,
        storageManager
      ),
  });

  async function handlerVideoUpload(videoId, peertubeVideosHelpers) {
    let ffprobeId = "";
    let mediainfoId = "";
    let mediainfoEbuId = "";
    let mediainfoEbuDefaultsId = "";
    const path = await getPath(videoId, peertubeVideosHelpers);

    // mediainfo
    const mediainfoActive = await settingsManager.getSetting(
      "mediainfo-active"
    );
    if (mediainfoActive) {
      try {
        const MediaInfo = require("./../tools/Mediainfo.js");
        const mediaInfo = new MediaInfo();
        const result = await mediaInfo.analyzeVideo(path);
        console.log("mediainfoStreams");
        console.log(result);
        mediainfoId = await mediainfoMetadataDAO.addMediainfoMetadata(
          JSON.stringify(result)
        );
      } catch (error) {
        console.error("Error in mediainfo: ", error);
      }
    }

    // mediainfoEBU
    const mediainfoEbuActive = await settingsManager.getSetting(
      "mediainfo-ebu-active"
    );
    if (mediainfoEbuActive) {
      try {
        const MediainfoEBU = require("./../tools/MediainfoEBU.js");
        const mediainfoEBU = new MediainfoEBU();
        const result = await mediainfoEBU.analyzeVideo(path);
        mediainfoEbuId = await mediainfoMetadataEBUDAO.addMediainfoMetadataEBU(
          JSON.stringify(result)
        );
      } catch (error) {
        console.error("Error in mediainfoEBU: ", error);
      }
    }

    // ffprobe
    const ffprobeActive = await settingsManager.getSetting("ffprobe-active");
    if (ffprobeActive) {
      try {
        const FFProbe = require("./../tools/FFprobe.js");
        const ffprobe = new FFProbe();
        const result = await ffprobe.analyzeVideo(path);
        console.log("ffprobeStreams");
        console.log(result);
        ffprobeId = await ffprobeMetadataDAO.addFfprobeMetadata(
          JSON.stringify(result)
        );
      } catch (error) {
        console.error("Error in ffprobe: ", error);
      }
    }

    ffprobeId = await ffprobeMetadataDAO.addFfprobeMetadata(
      JSON.stringify(result)
    );

    mediainfoEbuDefaultsId = await metadataEBUDefaultDAO.addMetadataEBUDefault(
      "{}"
    );

    try {
      await Promise.all([
        ffprobeId,
        mediainfoId,
        mediainfoEbuId,
        mediainfoEbuDefaultsId,
      ]);

      const videoMetadataData = {
        fk_ffprobe_metadata_id: ffprobeId,
        fk_mediainfo_metadata_id: mediainfoId,
        fk_mediainfo_metadata_ebu_id: mediainfoEbuId,
        fk_metadata_ebu_default_id: mediainfoEbuDefaultsId,
        fk_video_id: videoId,
      };

      await videoMetadataDAO.addVideoMetadata(videoMetadataData);
    } catch (error) {
      console.error("Error waiting for promises: ", error);
    }
  }
};

module.exports = {
  initVideoUploadHooks,
};
