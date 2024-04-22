class MergeHelper {
  async mergeStandardVideoData(standardVideoData, pluginVideoData) {
    try {
      if (!standardVideoData) {
        console.error("Invalid input: standardVideoData is missing.");
        return;
      }

      if (!pluginVideoData) {
        console.error("Invalid input: pluginVideoData is missing.");
        return;
      }

      pluginVideoData["show.title.title"] = standardVideoData.name || "";
      pluginVideoData["show.description.text"] =
        standardVideoData.description || "";
      pluginVideoData["show.description.tags"] = standardVideoData.tags || "";
      pluginVideoData["show.language"] = standardVideoData.language || "";
      pluginVideoData["show.category"] = standardVideoData.category || "";
      pluginVideoData["rights.copyright.rightId"] =
        standardVideoData.licence || "";
      //No assignment for videoEditData.support, videoEditData.channelId, videoEditData.privacy, videoEditData.nsfw, videoEditData.waitTranscoding, videoEditData.commentsEnabled, videoEditData.downloadEnabled
      console.log("StandardVideoData successfully synced!");
      return pluginVideoData;
    } catch (error) {
      console.warn("StandardVideoData error syncing:", error.message);
    }
  }

  async mergeMetadata(metadata, pluginVideoData) {
    try {
      if (!metadata) {
        console.error("Invalid input: metadata is missing.");
        return;
      }

      if (!pluginVideoData) {
        console.error("Invalid input: pluginVideoData is missing.");
        return;
      }

      for (var data in metadata) {
        pluginVideoData[data] = metadata[data];
      }

      console.log("Metadata successfully synced!");
      return pluginVideoData;
    } catch (error) {
      console.warn("Metadata error syncing:", error.message);
    }
  }
}

module.exports = {
  MergeHelper,
};
