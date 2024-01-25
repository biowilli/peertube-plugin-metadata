async function syncMetaDataDAO(
  mediaInfo,
  mediainfoEBU,
  ffprobe,
  videoId,
  peertubeVideosHelpers,
  mediainfoMetadataDAO,
  mediainfoMetadataEBUDAO,
  ffprobeMetadataDAO,
  metadataEBUDefaultDAO,
  videoMetadataDAO
) {
  let ffprobeId = "";
  let mediainfoId = "";
  let mediainfoEbuId = "";
  let mediainfoEbuDefaultsId = "";
  const path = await getPath(videoId, peertubeVideosHelpers);

  // mediainfo
  try {
    const result = await mediaInfo.analyzeVideo(path);
    console.log("mediainfoStreams");
    console.log(result);
    mediainfoId = await mediainfoMetadataDAO.addMediainfoMetadata(
      JSON.stringify(result)
    );
  } catch (error) {
    console.error("Error in mediainfo: ", error);
  }

  // mediainfoEBU
  try {
    const result = await mediainfoEBU.analyzeVideo(path);
    mediainfoEbuId = await mediainfoMetadataEBUDAO.addMediainfoMetadataEBU(
      JSON.stringify(result)
    );
  } catch (error) {
    console.error("Error in mediainfoEBU: ", error);
  }

  // ffprobe
  try {
    const result = await ffprobe.analyzeVideo(path);
    console.log("ffprobeStreams");
    console.log(result);
    ffprobeId = await ffprobeMetadataDAO.addFfprobeMetadata(
      JSON.stringify(result)
    );
  } catch (error) {
    console.error("Error in ffprobe: ", error);
  }

  // sync
  try {
    mediainfoEbuDefaultsId = await metadataEBUDefaultDAO.addMetadataEBUDefault(
      "{}"
    );
  } catch (error) {
    console.error("Error in ffprobe: ", error);
  }

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

    return await videoMetadataDAO.addVideoMetadata(videoMetadataData);
  } catch (error) {
    console.error("Error waiting for promises: ", error);
  }
}

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
  syncMetaDataDAO,
};
