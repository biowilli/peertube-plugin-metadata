class SyncHelper {
  async syncEbuDefaults(metadata, ebuDefaults, userId) {
    try {
      ebuDefaults["creator"] = [];
      ebuDefaults["contributor"] = [];
      ebuDefaults["organization"] = [];
      const currentDate = new Date().toISOString();
      ebuDefaults["lastModified"] = currentDate;
      ebuDefaults["changedBy"] = userId;
      for (const key in metadata) {
        console.log("key", key);
        if (key in metadata && metadata[key] !== undefined) {
          if (ebuDefaults[key] != null || ebuDefaults[key] != undefined) {
            console.log(metadata[key]);
            ebuDefaults[key] = metadata[key];
          }
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

  //sync this
  async syncMediainfoMetadata(mediainfoMetadata, pluginVideoData) {
    console.log("syncing this MediainfoMetadata");
    try {
      mediainfoMetadata = JSON.parse(mediainfoMetadata);

      console.log("try sync infoStream");
      var infoStream = mediainfoMetadata.infoStream;
      if (infoStream != undefined) {
        console.log("syncing infoStream");
        pluginVideoData = await this.syncInfoStream(
          pluginVideoData,
          infoStream
        );
        console.log("synced infoStream");
      } else {
        console.log("no infoStream to sync");
      }

      console.log("try sync audioStream");
      var audioStream = mediainfoMetadata.audioStreams[0];
      if (audioStream != undefined) {
        console.log("syncing audioStream");
        pluginVideoData = await this.syncAudioStream(
          pluginVideoData,
          audioStream
        );
        console.log("synced audioStream");
      } else {
        console.log("no audioStream to sync");
      }

      console.log("try sync videoStream");
      var videoStreams = videoStreams;
      if (videoStreams != undefined) {
        console.log("syncing videoStream");
        pluginVideoData = await this.syncVideoStream(
          pluginVideoData,
          videoStreams
        );
        console.log("synced videoStream");
      } else {
        console.log("no videoStream to sync");
      }

      console.log("MediainfoMetadata successfully synced:");
      console.log(pluginVideoData);
      return pluginVideoData;
    } catch (error) {
      console.warn("MediainfoMetadata error syncing:", error.message);
    }
  }

  async syncInfoStream(pluginVideoData, infoStream) {
    pluginVideoData["mediainfo.infoStream.uuid"] = infoStream.uuid;
    pluginVideoData["mediainfo.infoStream.streamCount"] =
      infoStream.streamCount;
    pluginVideoData["mediainfo.infoStream.videoCount"] = infoStream.videoCount;
    pluginVideoData["mediainfo.infoStream.audioCount"] = infoStream.audioCount;
    pluginVideoData["mediainfo.infoStream.textCount"] = infoStream.textCount;
    pluginVideoData["mediainfo.infoStream.menuCount"] = infoStream.menuCount;
    pluginVideoData["mediainfo.infoStream.videoFormat"] =
      infoStream.videoFormat;
    pluginVideoData["mediainfo.infoStream.videoCodec"] = infoStream.videoCodec;
    pluginVideoData["mediainfo.infoStream.videoLanguage"] =
      infoStream.videoLanguage;
    pluginVideoData["mediainfo.infoStream.audioFormat"] =
      infoStream.audioFormat;
    pluginVideoData["mediainfo.infoStream.audioCodec"] = infoStream.audioCodec;
    pluginVideoData["mediainfo.infoStream.audioLanguage"] =
      infoStream.audioLanguage;
    pluginVideoData["mediainfo.infoStream.textFormat"] = infoStream.textFormat;
    pluginVideoData["mediainfo.infoStream.textCodec"] = infoStream.textCodec;
    pluginVideoData["mediainfo.infoStream.textLanguage"] =
      infoStream.textLanguage;
    pluginVideoData["mediainfo.infoStream.filePath"] = infoStream.filePath;
    pluginVideoData["mediainfo.infoStream.folderName"] = infoStream.folderName;
    pluginVideoData["mediainfo.infoStream.fileName"] = infoStream.fileName;
    pluginVideoData["mediainfo.infoStream.fileExtension"] =
      infoStream.fileExtension;
    pluginVideoData["mediainfo.infoStream.format"] = infoStream.format;
    pluginVideoData["mediainfo.infoStream.formatExtensions"] =
      infoStream.formatExtensions;
    pluginVideoData["mediainfo.infoStream.formatProfile"] =
      infoStream.formatProfile;
    pluginVideoData["mediainfo.infoStream.internetMediaType"] =
      infoStream.internetMediaType;
    pluginVideoData["mediainfo.infoStream.codecID"] = infoStream.codecID;
    pluginVideoData["mediainfo.infoStream.codecIDUrl"] = infoStream.codecIDUrl;
    pluginVideoData["mediainfo.infoStream.codecIDCompatible"] =
      infoStream.codecIDCompatible;
    pluginVideoData["mediainfo.infoStream.fileSize"] = infoStream.fileSize;
    pluginVideoData["mediainfo.infoStream.fileSizeFormatted"] =
      infoStream.fileSizeFormatted;
    pluginVideoData["mediainfo.infoStream.duration"] = infoStream.duration;
    pluginVideoData["mediainfo.infoStream.durationFormatted"] =
      infoStream.durationFormatted;
    pluginVideoData["mediainfo.infoStream.durationSMTP"] =
      infoStream.durationSMTP;
    pluginVideoData["mediainfo.infoStream.durationEBUCore"] =
      infoStream.durationEBUCore;
    pluginVideoData["mediainfo.infoStream.overallBitRateMode"] =
      infoStream.overallBitRateMode;
    pluginVideoData["mediainfo.infoStream.overallBitRate"] =
      infoStream.overallBitRate;
    pluginVideoData["mediainfo.infoStream.overallBitRateUnit"] =
      infoStream.overallBitRateUnit;
    pluginVideoData["mediainfo.infoStream.frameRate"] = infoStream.frameRate;
    pluginVideoData["mediainfo.infoStream.frameCount"] = infoStream.frameCount;
    pluginVideoData["mediainfo.infoStream.streamSize"] = infoStream.streamSize;
    pluginVideoData["mediainfo.infoStream.headerSize"] = infoStream.headerSize;
    pluginVideoData["mediainfo.infoStream.dataSize"] = infoStream.dataSize;
    pluginVideoData["mediainfo.infoStream.footerSize"] = infoStream.footerSize;
    pluginVideoData["mediainfo.infoStream.title"] = infoStream.title;
    pluginVideoData["mediainfo.infoStream.movie"] = infoStream.movie;
    pluginVideoData["mediainfo.infoStream.performer"] = infoStream.performer;
    pluginVideoData["mediainfo.infoStream.genre"] = infoStream.genre;
    pluginVideoData["mediainfo.infoStream.encodedDate"] =
      infoStream.encodedDate;
    pluginVideoData["mediainfo.infoStream.taggedDate"] = infoStream.taggedDate;
    pluginVideoData["mediainfo.infoStream.fileModifiedDate"] =
      infoStream.fileModifiedDate;

    return pluginVideoData;
  }

  async syncAudioStream(pluginVideoData, audioStream) {
    pluginVideoData["mediainfo.audioStreams.uuid"] = audioStream.uuid;
    pluginVideoData["mediainfo.audioStreams.id"] = audioStream.id;
    pluginVideoData["mediainfo.audioStreams.streamCount"] =
      audioStream.streamCount;
    pluginVideoData["mediainfo.audioStreams.streamOrder"] =
      audioStream.streamOrder;
    pluginVideoData["mediainfo.audioStreams.typeOrder"] = audioStream.typeOrder;
    pluginVideoData["mediainfo.audioStreams.format"] = audioStream.format;
    pluginVideoData["mediainfo.audioStreams.codecID"] = audioStream.codecID;
    pluginVideoData["mediainfo.audioStreams.duration"] = audioStream.duration;
    pluginVideoData["mediainfo.audioStreams.durationFormatted"] =
      audioStream.durationFormatted;
    pluginVideoData["mediainfo.audioStreams.bitRate"] = audioStream.bitRate;
    pluginVideoData["mediainfo.audioStreams.frameRate"] = audioStream.frameRate;
    pluginVideoData["mediainfo.audioStreams.frameCount"] =
      audioStream.frameCount;
    pluginVideoData["mediainfo.audioStreams.streamSize"] =
      audioStream.streamSize;
    pluginVideoData["mediainfo.audioStreams.streamSizeUnit"] =
      audioStream.streamSizeUnit;
    pluginVideoData["mediainfo.audioStreams.languageCode"] =
      audioStream.languageCode;
    pluginVideoData["mediainfo.audioStreams.languageCode3"] =
      audioStream.languageCode3;
    pluginVideoData["mediainfo.audioStreams.language"] = audioStream.language;
    pluginVideoData["mediainfo.audioStreams.default"] = audioStream.default;
    pluginVideoData["mediainfo.audioStreams.forced"] = audioStream.forced;
    pluginVideoData["mediainfo.audioStreams.codecIDName"] =
      audioStream.codecIDName;
    pluginVideoData["mediainfo.audioStreams.encoding"] = audioStream.encoding;
    pluginVideoData["mediainfo.audioStreams.encodingUrl"] =
      audioStream.encodingUrl;
    pluginVideoData["mediainfo.audioStreams.formatUrl"] = audioStream.formatUrl;
    pluginVideoData["mediainfo.audioStreams.formatAdditionalFeatures"] =
      audioStream.formatAdditionalFeatures;
    pluginVideoData["mediainfo.audioStreams.formatSettingsEndianness"] =
      audioStream.formatSettingsEndianness;
    pluginVideoData["mediainfo.audioStreams.durationSMTP"] =
      audioStream.durationSMTP;
    pluginVideoData["mediainfo.audioStreams.durationEBUCore"] =
      audioStream.durationEBUCore;
    pluginVideoData["mediainfo.audioStreams.sourceDuration"] =
      audioStream.sourceDuration;
    pluginVideoData["mediainfo.audioStreams.sourceDurationFormatted"] =
      audioStream.sourceDurationFormatted;
    pluginVideoData["mediainfo.audioStreams.delay"] = audioStream.delay;
    pluginVideoData["mediainfo.audioStreams.delayFormatted"] =
      audioStream.delayFormatted;
    pluginVideoData["mediainfo.audioStreams.delaySource"] =
      audioStream.delaySource;
    pluginVideoData["mediainfo.audioStreams.videoDelay"] =
      audioStream.videoDelay;
    pluginVideoData["mediainfo.audioStreams.videoDelayFormatted"] =
      audioStream.videoDelayFormatted;
    pluginVideoData["mediainfo.audioStreams.bitRateMode"] =
      audioStream.bitRateMode;
    pluginVideoData["mediainfo.audioStreams.bitRateMaximum"] =
      audioStream.bitRateMaximum;
    pluginVideoData["mediainfo.audioStreams.channels"] = audioStream.channels;
    pluginVideoData["mediainfo.audioStreams.channelPositions"] =
      audioStream.channelPositions;
    pluginVideoData["mediainfo.audioStreams.channelPositionsFormatted"] =
      audioStream.channelPositionsFormatted;
    pluginVideoData["mediainfo.audioStreams.channelLayout"] =
      audioStream.channelLayout;
    pluginVideoData["mediainfo.audioStreams.samplesPerFrame"] =
      audioStream.samplesPerFrame;
    pluginVideoData["mediainfo.audioStreams.samplingRate"] =
      audioStream.samplingRate;
    pluginVideoData["mediainfo.audioStreams.samplingCount"] =
      audioStream.samplingCount;
    pluginVideoData["mediainfo.audioStreams.sourceFrameCount"] =
      audioStream.sourceFrameCount;
    pluginVideoData["mediainfo.audioStreams.compressionMode"] =
      audioStream.compressionMode;
    pluginVideoData["mediainfo.audioStreams.sourceStreamSize"] =
      audioStream.sourceStreamSize;
    pluginVideoData["mediainfo.audioStreams.serviceKind"] =
      audioStream.serviceKind;
    pluginVideoData["mediainfo.audioStreams.encodedDate"] =
      audioStream.encodedDate;
    pluginVideoData["mediainfo.audioStreams.taggedDate"] =
      audioStream.taggedDate;

    return pluginVideoData;
  }

  async syncVideoStream(pluginVideoData, videoStreams) {
    pluginVideoData["mediainfo.videoStreams.uuid"] = videoStreams.uuid;
    pluginVideoData["mediainfo.videoStreams.id"] = videoStreams.id;
    pluginVideoData["mediainfo.videoStreams.streamCount"] =
      videoStreams.streamCount;
    pluginVideoData["mediainfo.videoStreams.streamOrder"] =
      videoStreams.streamOrder;
    pluginVideoData["mediainfo.videoStreams.typeOrder"] =
      videoStreams.typeOrder;
    pluginVideoData["mediainfo.videoStreams.format"] = videoStreams.format;
    pluginVideoData["mediainfo.videoStreams.codecID"] = videoStreams.codecID;
    pluginVideoData["mediainfo.videoStreams.duration"] = videoStreams.duration;
    pluginVideoData["mediainfo.videoStreams.durationFormatted"] =
      videoStreams.durationFormatted;
    pluginVideoData["mediainfo.videoStreams.bitRate"] = videoStreams.bitRate;
    pluginVideoData["mediainfo.videoStreams.frameRate"] =
      videoStreams.frameRate;
    pluginVideoData["mediainfo.videoStreams.frameCount"] =
      videoStreams.frameCount;
    pluginVideoData["mediainfo.videoStreams.streamSize"] =
      videoStreams.streamSize;
    pluginVideoData["mediainfo.videoStreams.streamSizeUnit"] =
      videoStreams.streamSizeUnit;
    pluginVideoData["mediainfo.videoStreams.languageCode"] =
      videoStreams.languageCode;
    pluginVideoData["mediainfo.videoStreams.languageCode3"] =
      videoStreams.languageCode3;
    pluginVideoData["mediainfo.videoStreams.language"] = videoStreams.language;
    pluginVideoData["mediainfo.videoStreams.default"] = videoStreams.default;
    pluginVideoData["mediainfo.videoStreams.forced"] = videoStreams.forced;
    pluginVideoData["mediainfo.videoStreams.codecIDName"] =
      videoStreams.codecIDName;
    pluginVideoData["mediainfo.videoStreams.encoding"] = videoStreams.encoding;
    pluginVideoData["mediainfo.videoStreams.encodingUrl"] =
      videoStreams.encodingUrl;
    pluginVideoData["mediainfo.videoStreams.formatUrl"] =
      videoStreams.formatUrl;
    pluginVideoData["mediainfo.videoStreams.formatProfile"] =
      videoStreams.formatProfile;
    pluginVideoData["mediainfo.videoStreams.formatLevel"] =
      videoStreams.formatLevel;
    pluginVideoData["mediainfo.videoStreams.formatTier"] =
      videoStreams.formatTier;
    pluginVideoData["mediainfo.videoStreams.formatSettings"] =
      videoStreams.formatSettings;
    pluginVideoData["mediainfo.videoStreams.formatSettingsCABAC"] =
      videoStreams.formatSettingsCABAC;
    pluginVideoData["mediainfo.videoStreams.formatSettingsRefFrames"] =
      videoStreams.formatSettingsRefFrames;
    pluginVideoData["mediainfo.videoStreams.formatSettingsGOP"] =
      videoStreams.formatSettingsGOP;
    pluginVideoData["mediainfo.videoStreams.internetMediaType"] =
      videoStreams.internetMediaType;
    pluginVideoData["mediainfo.videoStreams.fileName"] = videoStreams.fileName;
    pluginVideoData["mediainfo.videoStreams.fileExtension"] =
      videoStreams.fileExtension;
    pluginVideoData["mediainfo.videoStreams.durationSMTP"] =
      videoStreams.durationSMTP;
    pluginVideoData["mediainfo.videoStreams.durationEBUCore"] =
      videoStreams.durationEBUCore;
    pluginVideoData["mediainfo.videoStreams.delay"] = videoStreams.delay;
    pluginVideoData["mediainfo.videoStreams.delayFormatted"] =
      videoStreams.delayFormatted;
    pluginVideoData["mediainfo.videoStreams.delaySource"] =
      videoStreams.delaySource;
    pluginVideoData["mediainfo.videoStreams.width"] = videoStreams.width;
    pluginVideoData["mediainfo.videoStreams.widthUnit"] =
      videoStreams.widthUnit;
    pluginVideoData["mediainfo.videoStreams.height"] = videoStreams.height;
    pluginVideoData["mediainfo.videoStreams.heightUnit"] =
      videoStreams.heightUnit;
    pluginVideoData["mediainfo.videoStreams.storedHeight"] =
      videoStreams.storedHeight;
    pluginVideoData["mediainfo.videoStreams.sampledWidth"] =
      videoStreams.sampledWidth;
    pluginVideoData["mediainfo.videoStreams.sampledHeight"] =
      videoStreams.sampledHeight;
    pluginVideoData["mediainfo.videoStreams.pixelAspectRatio"] =
      videoStreams.pixelAspectRatio;
    pluginVideoData["mediainfo.videoStreams.displayAspectRatio"] =
      videoStreams.displayAspectRatio;
    pluginVideoData["mediainfo.videoStreams.displayAspectRatioString"] =
      videoStreams.displayAspectRatioString;
    pluginVideoData["mediainfo.videoStreams.displayAspectRatioNum"] =
      videoStreams.displayAspectRatioNum;
    pluginVideoData["mediainfo.videoStreams.displayAspectRatioDen"] =
      videoStreams.displayAspectRatioDen;
    pluginVideoData["mediainfo.videoStreams.rotation"] = videoStreams.rotation;
    pluginVideoData["mediainfo.videoStreams.frameRateMode"] =
      videoStreams.frameRateMode;
    pluginVideoData["mediainfo.videoStreams.frameRateBase"] =
      videoStreams.frameRateBase;
    pluginVideoData["mediainfo.videoStreams.frameRateNum"] =
      videoStreams.frameRateNum;
    pluginVideoData["mediainfo.videoStreams.frameRateDen"] =
      videoStreams.frameRateDen;
    pluginVideoData["mediainfo.videoStreams.colorSpace"] =
      videoStreams.colorSpace;
    pluginVideoData["mediainfo.videoStreams.chromaSubsampling"] =
      videoStreams.chromaSubsampling;
    pluginVideoData["mediainfo.videoStreams.bitDepth"] = videoStreams.bitDepth;
    pluginVideoData["mediainfo.videoStreams.bitDepthUnit"] =
      videoStreams.bitDepthUnit;
    pluginVideoData["mediainfo.videoStreams.scanType"] = videoStreams.scanType;
    pluginVideoData["mediainfo.videoStreams.colorDescriptionPresent"] =
      videoStreams.colorDescriptionPresent;
    pluginVideoData["mediainfo.videoStreams.colorRange"] =
      videoStreams.colorRange;
    pluginVideoData["mediainfo.videoStreams.colorPrimaries"] =
      videoStreams.colorPrimaries;
    pluginVideoData["mediainfo.videoStreams.transferCharacteristics"] =
      videoStreams.transferCharacteristics;
    pluginVideoData["mediainfo.videoStreams.matrixCoefficients"] =
      videoStreams.matrixCoefficients;
    pluginVideoData["mediainfo.videoStreams.encodedLibraryName"] =
      videoStreams.encodedLibraryName;
    pluginVideoData["mediainfo.videoStreams.encodedLibraryVersion"] =
      videoStreams.encodedLibraryVersion;
    pluginVideoData["mediainfo.videoStreams.encodedDate"] =
      videoStreams.encodedDate;
    pluginVideoData["mediainfo.videoStreams.taggedDate"] =
      videoStreams.taggedDate;

    return pluginVideoData;
  }

  async sync(
    standardVideoData,
    mediainfoMetadata,
    pluginVideoData,
    ebuDefaults,
    userId
  ) {
    /*     
    console.log("start complete sync");
    console.log(standardVideoData);
    console.log(mediainfoMetadata);
    console.log(pluginVideoData);
    console.log(ebuDefaults);
    console.log(userId);
    */
    try {
      const pluginVideoDataStandardVideoDataSynced =
        await this.syncStandardVideoData(standardVideoData, pluginVideoData);

      console.log(
        "pluginVideoDataStandardVideoDataSynced",
        pluginVideoDataStandardVideoDataSynced
      );

      const mediainfoMetadataSynced = await this.syncMediainfoMetadata(
        mediainfoMetadata,
        pluginVideoDataStandardVideoDataSynced
      );

      console.log("mediainfoMetadataSynced", mediainfoMetadataSynced);

      const completedSynced = await this.syncEbuDefaults(
        mediainfoMetadataSynced,
        ebuDefaults,
        userId
      );

      return completedSynced;
    } catch (error) {
      console.warn("Error during synchronization:", error.message);
    }
  }
}

module.exports = {
  SyncHelper,
};
