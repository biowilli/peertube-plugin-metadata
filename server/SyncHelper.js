const { EBUDefaults } = require("../model/EbuDefaults");

class SyncHelper {
  extractId(key) {
    const idParts = key.split("-");
    const extractedId =
      idParts[1] +
      "-" +
      idParts[2] +
      "-" +
      idParts[3] +
      "-" +
      idParts[4] +
      "-" +
      idParts[5];
    return extractedId;
  }

  async syncEbuDefaults(metadata, ebuDefaults, userId) {
    try {
      ebuDefaults["creator"] = [];
      ebuDefaults["contributor"] = [];
      ebuDefaults["organization"] = [];
      const currentDate = new Date().toISOString();
      ebuDefaults["lastModified"] = currentDate;
      ebuDefaults["changedBy"] = userId;
      for (const key in metadata) {
        if (key in metadata && metadata[key] !== undefined) {
          if (ebuDefaults[key] != null || ebuDefaults[key] != undefined) {
            console.log(metadata[key]);
            ebuDefaults[key] = metadata[key];
          }
          /* else {
            if (key.startsWith("creator-")) {
              var creatorId = this.extractId(key);
              if (
                !ebuDefaults["creator"].includes(creatorId) &&
                metadata[key] == "true"
              ) {
                ebuDefaults["creator"].push(creatorId);
              }
            } else if (key.startsWith("contributor-")) {
              var contributorId = this.extractId(key);
              if (
                !ebuDefaults["contributor"].includes(contributorId) &&
                metadata[key] == "true"
              ) {
                ebuDefaults["contributor"].push(contributorId);
              }
            } else if (key.startsWith("organization-")) {
              var organizationId = this.extractId(key);
              if (
                !ebuDefaults["organization"].includes(organizationId) &&
                metadata[key] == "true"
              ) {
                ebuDefaults["organization"].push(organizationId);
              }
            } else {
              console.log(key, "Property does not exist in EbuDefaults");
            }
          } */
        }
      }
    } catch (error) {
      console.warn("StandardVideoData error syncing:", error.message);
    } finally {
      console.log("StandardVideoData successfully synced!");
      console.log(ebuDefaults);
      return ebuDefaults;
    }
  }

  async syncStandardVideoData(standardVideoData, pluginVideoData) {
    try {
      if (!standardVideoData) {
        console.error("Invalid input: standardVideoData is missing.");
        return;
      }

      if (!pluginVideoData) {
        console.error("Invalid input: pluginVideoData is missing.");
        return;
      }

      console.log(
        "Synchronize StandardVideoData",
        standardVideoData,
        "to",
        pluginVideoData
      );

      pluginVideoData["title.title"] = standardVideoData.name || "";
      pluginVideoData["description.text"] = standardVideoData.description || "";
      pluginVideoData["description.tags"] = standardVideoData.tags || "";
      pluginVideoData["videoInformation.language"] =
        standardVideoData.language || "";
      pluginVideoData["videoInformation.category"] =
        standardVideoData.category || "";
      pluginVideoData["rights.copyright.rightId"] =
        standardVideoData.licence || "";
      //No assignment for videoEditData.support, videoEditData.channelId, videoEditData.privacy, videoEditData.nsfw, videoEditData.waitTranscoding, videoEditData.commentsEnabled, videoEditData.downloadEnabled
      console.log("StandardVideoData successfully synced!");
      console.log(pluginVideoData);
      return pluginVideoData;
    } catch (error) {
      console.warn("StandardVideoData error syncing:", error.message);
    }
  }

  //TODO: Make different fields for that, variable creation for videoEdit possible
  async syncMediainfoMetadata(mediainfoMetadata, pluginVideoData) {
    console.log("syncing this MediainfoMetadata");
    mediainfoMetadata = JSON.parse(mediainfoMetadata);
    try {
      pluginVideoData["mediainfo.infoStream"] = JSON.stringify(
        mediainfoMetadata.infoStream
      );
      pluginVideoData["mediainfo.audioStreams"] = JSON.stringify(
        mediainfoMetadata.audioStreams
      );
      pluginVideoData["mediainfo.videoStreams"] = JSON.stringify(
        mediainfoMetadata.videoStreams
      );
      pluginVideoData["mediainfo.textStreams"] = JSON.stringify(
        mediainfoMetadata.textStreams
      );
      pluginVideoData["mediainfo.menuStreams"] = JSON.stringify(
        mediainfoMetadata.menuStreams
      );

      console.log("MediainfoMetadata successfully synced!");
      return pluginVideoData;
    } catch (error) {
      console.warn("MediainfoMetadata error syncing:", error.message);
    }
  }

  async makeCompleteSync(
    standardVideoData,
    mediainfoMetadata,
    pluginVideoData,
    ebuDefaults,
    userId
  ) {
    console.log("start complete sync");
    var pluginVideoDataStandardVideoDataSynced =
      await this.syncStandardVideoData(standardVideoData, pluginVideoData);
    var mediainfoMetadataSynced = await this.syncMediainfoMetadata(
      mediainfoMetadata,
      pluginVideoDataStandardVideoDataSynced
    );

    var completedSynced = await this.syncEbuDefaults(
      mediainfoMetadataSynced,
      ebuDefaults,
      userId
    );
    return completedSynced;
  }
}

module.exports = {
  SyncHelper,
};
