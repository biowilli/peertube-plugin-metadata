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

module.exports = {
  getPath,
};
