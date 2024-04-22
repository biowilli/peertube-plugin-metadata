const { getMetadata } = require("./../tools/trp_mediainfo");
const { flatten } = require("./../Flatten.js");

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
  peertubeVideosHelpers,
  metadataDAO
) => {
  registerHook({
    target: "action:api.video.uploaded",
    handler: async ({ video, body }) => {
      console.log("action:api.video.uploaded triggered");
      var videoId = video.dataValues.id;
      const path = await getPath(videoId, peertubeVideosHelpers);

      var result = await metadataDAO.findMetadata(videoId);
      console.log(result);
      if (result[1].rowCount > 0) {
        console.log("Metadata via hook not added");
        return;
      }

      const mediainfoMetaData = await getMetadata(path);
      console.log("mediainfoMetaData", mediainfoMetaData);
      const analysedJSON = {
        mediainfo: mediainfoMetaData,
      };
      console.log("analysedJSON", analysedJSON);
      var flattenMetadata = flatten(analysedJSON);
      console.log("flatten analysedJSON", flattenMetadata);
      console.log("addMetadata via hook");
      await metadataDAO.addMetadata(JSON.stringify(flattenMetadata), videoId);
    },
  });
};

module.exports = {
  initVideoUploadHooks,
};
