const { setParser } = require("./../ParserHelper.js");
const { getMetadata } = require("./../tools/trp_mediainfo");

async function getPath(videoId, peertubeVideosHelpers) {
  const videoFiles = await getVideoFiles(videoId, peertubeVideosHelpers);
  if (videoFiles.length === 0) {
    console.log(`No valid video file found for the video ${videoId}.`);
    return null;
  }
  return videoFiles[0].path;
}

async function getVideoFiles(id, peerTubeVideosHelpers) {
  return await peerTubeVideosHelpers
    .getFiles(id)
    .then(
      ({
        webtorrent: { videoFiles: webtorrentVideoFiles },
        hls: { videoFiles: hlsVideoFiles },
      }) =>
        webtorrentVideoFiles
          .concat(hlsVideoFiles)
          .sort(({ size: sizeA }, { size: sizeB }) => sizeA - sizeB)
    );
}

const initVideoUploadHooks = (
  registerHook,
  settingsManager,
  peertubeVideosHelpers,
  metadataDAO
) => {
  registerHook({
    target: "action:api.video.uploaded",
    handler: async ({ video, body }) => {
      /* video: VideoModel {
        dataValues: {
          uuid: 'b55af45a-350a-4741-a9cc-9647da4dd240',
          category: null,
          language: null,
          description: null,
          support: null,
          views: 0,
          likes: 0,
          dislikes: 0,
          isLive: false,
          publishedAt: 2024-01-26T14:37:52.475Z,
          id: 271,
          name: '20230325_UNT_KAL_0053_TSC_S04_E01_Kaleidoskop_Fraueneishockey-in-Oesterreich',
          remote: false,
          licence: null,
          commentsEnabled: true,
          downloadEnabled: true,
          waitTranscoding: true,
          nsfw: false,
          privacy: 3,
          channelId: 1,
          originallyPublishedAt: null,
          state: 2,
          duration: 232,
          url: 'http://localhost:9000/videos/watch/b55af45a-350a-4741-a9cc-9647da4dd240',
          updatedAt: 2024-01-26T14:37:53.540Z,
          createdAt: 2024-01-26T14:37:53.540Z,
          inputFileUpdatedAt: null
        },
      */

      var videoId = video.dataValues.id;
      const path = await getPath(videoId, peertubeVideosHelpers);
      const completeMetadata = await getMetadata(path);
      const analysedJSON = {
        mediainfo: completeMetadata,
      };

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
      const parseredData = setParser(analysedJSON, formDataJSON);
      await metadataDAO.addMetadata(JSON.stringify(parseredData), videoId);
    },
  });
};

module.exports = {
  initVideoUploadHooks,
};
