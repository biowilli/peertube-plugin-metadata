class SyncHelper {
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
      return pluginVideoData;
    } catch (error) {
      console.warn("StandardVideoData error syncing:", error.message);
    }
  }

  async syncMetadata(metadata, pluginVideoData) {
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

  async syncSidecarfile() {
    var metadata = {
      "title.alternativeTitle": "asddsadasadadasdsa",
      "title.alternativeTitleNote": "",
      "title.note": "",
      refCreator: "",
      refContributor: "",
      refOrganization: "",
      "dates.coverage.daterecorded": "",
      "dates.issued.firstIssued": "",
      "dates.issued.lastIssued": "",
      "dates.dateDigitalised": "",
      "dates.videoLinks": "",
      "dates.publicationHistory": "",
      "dates.publicationHistory.firstPublicationDate": "",
      "dates.publicationHistory.firstPublicationTime": "",
      "dates.publicationHistory.firstPublicationChannel": "",
      "dates.publicationHistory.repeatChannel": "",
      "dates.archiveData.filesize": "",
      "dates.archiveData.filename": "",
      "dates.archiveData.archiveLocation": "",
      "dates.archiveData.archiveFilePath": "",
      "videoInformation.info": "",
      "videoInformation.genre": "",
      "videoInformation.targetgroup": "",
      "videoInformation.showType.series": "",
      "videoInformation.showType.season": "",
      "videoInformation.showType.episode": "",
      "videoInformation.parts": "",
      "videoInformation.version": "",
      "videoInformation.relation": "",
      "videoInformation.source": "",
      "videoInformation.rating.ratingValue": "",
      "videoInformation.rating.ratingScaleMinValue": "",
      "videoInformation.rating.ratingScaleMaxValue": "",
      "videoInformation.rating.notes": "",
      "rights.copyright.coverage.startDate": "",
      "rights.copyright.coverage.endDate": "",
      "rights.copyright.coverage.locations": "",
      "rights.copyright.exploitationIssues": "",
      "rights.copyright.disclaimer": "",
      "rights.copyright.rightClearanceFlag": "",
      "rights.usageRights.coverage": "",
      "rights.usageRights.exploitationIssues": "",
      "rights.usageRights.disclaimer": "",
      "rights.usageRights.rightClearanceFlag": "",
      "title.title":
        "20230325_UNT_KAL_0053_TSC_S04_E01_Kaleidoskop_Fraueneishockey-in-Oesterreich",
      "description.text": "",
      "description.tags": "",
      "videoInformation.language": "",
      "videoInformation.category": "",
      "rights.copyright.rightId": "",
      "mediainfo.info.uuid": null,
      "mediainfo.info.streamCount": 2,
      "mediainfo.info.videoCount": 1,
      "mediainfo.info.audioCount": 1,
      "mediainfo.info.textCount": 0,
      "mediainfo.info.menuCount": 0,
      "mediainfo.info.videoFormat": ["AVC"],
      "mediainfo.info.videoCodec": ["AVC"],
      "mediainfo.info.videoLanguage": ["English"],
      "mediainfo.info.audioFormat": ["AAC LC"],
      "mediainfo.info.audioCodec": ["AAC LC"],
      "mediainfo.info.audioLanguage": ["English"],
      "mediainfo.info.textFormat": null,
      "mediainfo.info.textCodec": null,
      "mediainfo.info.textLanguage": null,
      "mediainfo.info.filePath":
        "/Users/monz/Git/peertube2/PeerTube/storage/web-videos/private/a0780fd3-58cf-45b9-88a3-8a2eb2614568-1080.mp4",
      "mediainfo.info.folderName":
        "/Users/monz/Git/peertube2/PeerTube/storage/web-videos/private",
      "mediainfo.info.fileName":
        "a0780fd3-58cf-45b9-88a3-8a2eb2614568-1080.mp4",
      "mediainfo.info.fileExtension": "mp4",
      "mediainfo.info.format": "MPEG-4",
      "mediainfo.info.formatExtensions": [
        "braw",
        "mov",
        "mp4",
        "m4v",
        "m4a",
        "m4b",
        "m4p",
        "m4r",
        "3ga",
        "3gpa",
        "3gpp",
        "3gp",
        "3gpp2",
        "3g2",
        "k3g",
        "jpm",
        "jpx",
        "mqv",
        "ismv",
        "isma",
        "ismt",
        "f4a",
        "f4b",
        "f4v",
      ],
      "mediainfo.info.formatProfile": "Base Media / Version 2",
      "mediainfo.info.internetMediaType": "video/mp4",
      "mediainfo.info.codecID": "mp42",
      "mediainfo.info.codecIDUrl":
        "http://www.apple.com/quicktime/download/standalone.html",
      "mediainfo.info.codecIDCompatible": "mp42/mp41",
      "mediainfo.info.fileSize": 252097789,
      "mediainfo.info.fileSizeFormated": "240 MiB",
      "mediainfo.info.duration": 231.88,
      "mediainfo.info.durationFormated": "00:03:51.880",
      "mediainfo.info.durationSMTP": "00:03:51:22",
      "mediainfo.info.durationEBUCore": "PT3M51.880S",
      "mediainfo.info.overallBitRateMode": "VBR",
      "mediainfo.info.overallBitRate": 8697526,
      "mediainfo.info.overallBitRateUnit": "bps",
      "mediainfo.info.frameRate": 25,
      "mediainfo.info.frameCount": 5797,
      "mediainfo.info.streamSize": 94014,
      "mediainfo.info.headerSize": 92925,
      "mediainfo.info.dataSize": 252004864,
      "mediainfo.info.footerSize": 0,
      "mediainfo.info.isStreamable": true,
      "mediainfo.info.title": null,
      "mediainfo.info.movie": null,
      "mediainfo.info.performer": null,
      "mediainfo.info.genre": null,
      "mediainfo.info.encodedDate": null,
      "mediainfo.info.taggedDate": null,
      "mediainfo.info.fileModifiedDate": null,
      "mediainfo.info.containerFormatName": "MPEG-4",
      "mediainfo.info.containerEncoding": "MPEG-4",
      "mediainfo.info.dateCreatedDate": "2023-11-13",
      "mediainfo.info.dateCreatedTime": "10:50:06",
      "mediainfo.video.0.uuid": null,
      "mediainfo.video.0.id": 1,
      "mediainfo.video.0.streamCount": 1,
      "mediainfo.video.0.streamOrder": 0,
      "mediainfo.video.0.typeOrder": 0,
      "mediainfo.video.0.format": "AVC",
      "mediainfo.video.0.codecID": "avc1",
      "mediainfo.video.0.duration": 231.88,
      "mediainfo.video.0.durationFormated": "00:03:51.880",
      "mediainfo.video.0.bitRate": 8376920,
      "mediainfo.video.0.frameRate": 25,
      "mediainfo.video.0.frameCount": 5797,
      "mediainfo.video.0.streamSize": 242805038,
      "mediainfo.video.0.streamSizeUnit": "byte",
      "mediainfo.video.0.languageCode": "en",
      "mediainfo.video.0.languageCode3": "eng",
      "mediainfo.video.0.language": "English",
      "mediainfo.video.0.default": false,
      "mediainfo.video.0.forced": false,
      "mediainfo.video.0.codecIDName": "AVC",
      "mediainfo.video.0.encoding": "High@L4.2",
      "mediainfo.video.0.encodingUrl": null,
      "mediainfo.video.0.formatUrl": "http://developers.videolan.org/x264.html",
      "mediainfo.video.0.formatProfile": "High",
      "mediainfo.video.0.formatLevel": "4.2",
      "mediainfo.video.0.formatTier": null,
      "mediainfo.video.0.formatSettings": "CABAC / 3 Ref Frames",
      "mediainfo.video.0.formatSettingsCABAC": true,
      "mediainfo.video.0.formatSettingsRefFrames": 3,
      "mediainfo.video.0.formatSettingsGOP": "M=1, N=30",
      "mediainfo.video.0.internetMediaType": "video/H264",
      "mediainfo.video.0.fileName": null,
      "mediainfo.video.0.fileExtension": null,
      "mediainfo.video.0.durationSMTP": "00:03:51:22",
      "mediainfo.video.0.durationEBUCore": null,
      "mediainfo.video.0.delay": 0,
      "mediainfo.video.0.delayFormated": null,
      "mediainfo.video.0.delaySource": null,
      "mediainfo.video.0.width": 1920,
      "mediainfo.video.0.widthUnit": "pixel",
      "mediainfo.video.0.height": 1080,
      "mediainfo.video.0.heightUnit": "pixel",
      "mediainfo.video.0.storedHeight": 1088,
      "mediainfo.video.0.sampledWidth": 1920,
      "mediainfo.video.0.sampledHeight": 1080,
      "mediainfo.video.0.pixelAspectRatio": 1,
      "mediainfo.video.0.displayAspectRatio": 1.778,
      "mediainfo.video.0.displayAspectRatioString": "16:9",
      "mediainfo.video.0.displayAspectRatioNum": 16,
      "mediainfo.video.0.displayAspectRatioDen": 9,
      "mediainfo.video.0.rotation": 0,
      "mediainfo.video.0.frameRateMode": "CFR",
      "mediainfo.video.0.frameRateBase": 25,
      "mediainfo.video.0.frameRateNum": 1000,
      "mediainfo.video.0.frameRateDen": 1,
      "mediainfo.video.0.colorSpace": "YUV",
      "mediainfo.video.0.chromaSubsampling": "4:2:0",
      "mediainfo.video.0.bitDepth": 8,
      "mediainfo.video.0.bitDepthUnit": "bit",
      "mediainfo.video.0.scanType": "Progressive",
      "mediainfo.video.0.colorDescriptionPresent": false,
      "mediainfo.video.0.colorRange": null,
      "mediainfo.video.0.colorPrimaries": null,
      "mediainfo.video.0.transferCharacteristics": null,
      "mediainfo.video.0.matrixCoefficients": null,
      "mediainfo.video.0.encodedLibraryName": null,
      "mediainfo.video.0.encodedLibraryVersion": null,
      "mediainfo.video.0.encodedDate": null,
      "mediainfo.video.0.taggedDate": null,
      "mediainfo.video.0.aspectRatioType": "display",
      "mediainfo.audio.0.uuid": null,
      "mediainfo.audio.0.id": 2,
      "mediainfo.audio.0.streamCount": 1,
      "mediainfo.audio.0.streamOrder": 1,
      "mediainfo.audio.0.typeOrder": 0,
      "mediainfo.audio.0.format": "AAC",
      "mediainfo.audio.0.codecID": "mp4a-40-2",
      "mediainfo.audio.0.duration": 231.88,
      "mediainfo.audio.0.durationFormated": "00:03:51.880",
      "mediainfo.audio.0.bitRate": 317351,
      "mediainfo.audio.0.frameRate": 46.875,
      "mediainfo.audio.0.frameCount": 10869,
      "mediainfo.audio.0.streamSize": 9198737,
      "mediainfo.audio.0.streamSizeUnit": "byte",
      "mediainfo.audio.0.languageCode": "en",
      "mediainfo.audio.0.languageCode3": "eng",
      "mediainfo.audio.0.language": "English",
      "mediainfo.audio.0.default": false,
      "mediainfo.audio.0.forced": false,
      "mediainfo.audio.0.codecIDName": "AAC",
      "mediainfo.audio.0.encoding": null,
      "mediainfo.audio.0.encodingUrl": null,
      "mediainfo.audio.0.formatUrl": null,
      "mediainfo.audio.0.formatAdditionalFeatures": "LC",
      "mediainfo.audio.0.formatSettingsEndianness": null,
      "mediainfo.audio.0.durationSMTP": null,
      "mediainfo.audio.0.durationEBUCore": null,
      "mediainfo.audio.0.sourceDuration": 231.915,
      "mediainfo.audio.0.sourceDurationFormated": "00:03:51.915",
      "mediainfo.audio.0.delay": 0,
      "mediainfo.audio.0.delayFormated": null,
      "mediainfo.audio.0.delaySource": null,
      "mediainfo.audio.0.videoDelay": 0,
      "mediainfo.audio.0.videoDelayFormated": null,
      "mediainfo.audio.0.bitRateMode": "VBR",
      "mediainfo.audio.0.bitRateMaximum": 533248,
      "mediainfo.audio.0.channels": 2,
      "mediainfo.audio.0.channelPositions": "Front: L R",
      "mediainfo.audio.0.channelPositionsFormated": "2/0/0",
      "mediainfo.audio.0.channelLayout": "L R",
      "mediainfo.audio.0.samplesPerFrame": 1024,
      "mediainfo.audio.0.samplingRate": 48000,
      "mediainfo.audio.0.samplingCount": 11130240,
      "mediainfo.audio.0.sourceFrameCount": 10871,
      "mediainfo.audio.0.compressionMode": "Lossy",
      "mediainfo.audio.0.sourceStreamSize": 9199810,
      "mediainfo.audio.0.serviceKind": null,
      "mediainfo.audio.0.encodedDate": null,
      "mediainfo.audio.0.taggedDate": null,
      "mediainfo.default.audio": 0,
      "mediainfo.default.video": 0,
      "mediainfo.default.text": null,
      "mediainfo.default.menu": null,
    };

    //das ist ein example sidecarfile welches gesynced werden soll
    var sidecarfile = {
      "ebucore:ebuCoreMain": {
        "@version": "1.8",
        "@writingLibraryName": "MediaInfoLib",
        "@writingLibraryVersion": "23.10",
        "@dateLastModified": "2023-11-27",
        "@timeLastModified": "14:30:43",
        "ebucore:coreMetadata": [
          {
            "ebucore:format": [
              {
                "ebucore:videoFormat": [
                  {
                    "@videoFormatName": mediainfo["mediainfo.info.videoFormat"],
                    "ebucore:width": [
                      {
                        "@unit": mediainfo["mediainfo.video.0.widthUnit"],
                        "#value": mediainfo["mediainfo.video.0.width"],
                      },
                    ],
                    "ebucore:height": [
                      {
                        "@unit": mediainfo["mediainfo.video.0.heightUnit"],
                        "#value": mediainfo["mediainfo.video.0.height"],
                      },
                    ],
                    "ebucore:frameRate": [
                      {
                        "#value": mediainfo["mediainfo.video.0.frameRate"],
                      },
                    ],
                    "ebucore:aspectRatio": [
                      {
                        "@typeLabel":
                          mediainfo["mediainfo.video.0.aspectRatioType"],
                        "ebucore:factorNumerator": [
                          {
                            "#value":
                              mediainfo[
                                "mediainfo.video.0.displayAspectRatioNum"
                              ],
                          },
                        ],
                        "ebucore:factorDenominator": [
                          {
                            "#value":
                              mediainfo[
                                "mediainfo.video.0.displayAspectRatioDen"
                              ],
                          },
                        ],
                      },
                    ],
                    "ebucore:videoEncoding": [
                      {
                        "@typeLabel": mediainfo["mediainfo.video.0.encoding"],
                      },
                    ],
                    "ebucore:codec": [
                      {
                        "ebucore:codecIdentifier": [
                          {
                            "dc:identifier": [
                              {
                                "#value":
                                  mediainfo["mediainfo.video.0.codecID"],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "ebucore:bitRate": [
                      {
                        "#value": mediainfo["mediainfo.video.0.bitRate"],
                      },
                    ],
                    "ebucore:scanningFormat": [
                      {
                        "#value": mediainfo["mediainfo.video.0.scanType"],
                      },
                    ],
                    "ebucore:videoTrack": [
                      {
                        "@trackId": "1",
                      },
                    ],
                    "ebucore:technicalAttributeString": [
                      {
                        "@typeLabel": "ColorSpace",
                        "#value": mediainfo["mediainfo.video.0.colorSpace"],
                      },
                      {
                        "@typeLabel": "ChromaSubsampling",
                        "#value":
                          mediainfo["mediainfo.video.0.chromaSubsampling"],
                      },
                      {
                        "@typeLabel": "GOP",
                        "#value":
                          mediainfo["mediainfo.video.0.formatSettingsGOP"],
                      },
                    ],
                    "ebucore:technicalAttributeInteger": [
                      {
                        "@typeLabel": "BitDepth",
                        "@unit": mediainfo["mediainfo.video.0.bitDepthUnit"],
                        "#value": mediainfo["mediainfo.video.0.bitDepth"],
                      },
                      {
                        "@typeLabel": "StreamSize",
                        "@unit": mediainfo["mediainfo.video.0.streamSizeUnit"],
                        "#value": mediainfo["mediainfo.video.0.streamSize"],
                      },
                    ],
                    "ebucore:technicalAttributeBoolean": [
                      {
                        "@typeLabel": "CABAC",
                        "#value":
                          mediainfo["mediainfo.video.0.formatSettingsCABAC"],
                      },
                      {
                        "@typeLabel": "MBAFF",
                        "#value": "false",
                      },
                    ],
                  },
                ],
                "ebucore:audioFormat": [
                  {
                    "@audioFormatName": mediainfo["mediainfo.audio.0.format"],
                    "ebucore:audioEncoding": [{}],
                    "ebucore:codec": [
                      {
                        "ebucore:codecIdentifier": [
                          {
                            "dc:identifier": [
                              {
                                "#value":
                                  mediainfo["mediainfo.audio.0.codecID"],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "ebucore:samplingRate": [
                      {
                        "#value": mediainfo["mediainfo.audio.0.samplingRate"],
                      },
                    ],
                    "ebucore:bitRate": [
                      {
                        "#value": mediainfo["mediainfo.audio.0.bitRate"],
                      },
                    ],
                    "ebucore:bitRateMax": [
                      {
                        "#value": mediainfo["mediainfo.audio.0.bitRateMaximum"],
                      },
                    ],
                    "ebucore:bitRateMode": [
                      {
                        "#value": mediainfo["mediainfo.audio.0.bitRateMode"],
                      },
                    ],
                    "ebucore:audioTrack": [
                      {
                        "@trackId": "2",
                        "@trackLanguage":
                          mediainfo["mediainfo.audio.0.languageCode"],
                      },
                    ],
                    "ebucore:channels": [
                      {
                        "#value": mediainfo["mediainfo.audio.0.channels"],
                      },
                    ],
                    "ebucore:technicalAttributeString": [
                      {
                        "@typeLabel": "ChannelPositions",
                        "#value":
                          mediainfo["mediainfo.audio.0.channelPositions"],
                      },
                      {
                        "@typeLabel": "ChannelLayout",
                        "#value": mediainfo["mediainfo.audio.0.channelLayout"],
                      },
                    ],
                    "ebucore:technicalAttributeInteger": [
                      {
                        "@typeLabel": "StreamSize",
                        "@unit": mediainfo["mediainfo.audio.0.streamSizeUnit"],
                        "#value": mediainfo["mediainfo.audio.0.streamSize"],
                      },
                    ],
                  },
                ],
                "ebucore:containerFormat": [
                  {
                    "mediainfo.info.containerEncoding":
                      mediainfo["mediainfo.info.containerEncoding"],
                    "@containerFormatName":
                      mediainfo["mediainfo.info.containerFormatName"],
                    "ebucore:containerEncoding": [
                      {
                        "@formatLabel":
                          mediainfo["mediainfo.info.containerEncoding"],
                      },
                    ],
                    "ebucore:codec": [
                      {
                        "ebucore:codecIdentifier": [
                          {
                            "dc:identifier": [
                              {
                                "#value": mediainfo["ediainfo.info.codecID"],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "ebucore:technicalAttributeString": [
                      {
                        "@typeLabel": "FormatProfile",
                        "#value": mediainfo["mediainfo.info.formatProfil"],
                      },
                    ],
                  },
                ],
                "ebucore:duration": [
                  {
                    "ebucore:normalPlayTime": [
                      {
                        "#value": mediainfo["mediainfo.info.durationEBUCore"],
                      },
                    ],
                  },
                ],
                "ebucore:fileSize": [
                  {
                    "#value": mediainfo["mediainfo.info.fileSize"],
                  },
                ],
                "ebucore:fileName": [
                  {
                    "#value": mediainfo["mediainfo.info.fileName"],
                  },
                ],
                "ebucore:locator": [
                  {
                    "#value":
                      "/Volumes/Sendungen/_Auswahl_VoD/Videos/Kunst&Kultur/KULTmagazin/2023_S11/20230206_KUK_KUL_0082_FS1_S11_E01_Kultmagazin_Selbstversuch-in-der-Kunst.mp4",
                  },
                ],
                "ebucore:technicalAttributeInteger": [
                  {
                    "@typeLabel": "OverallBitRate",
                    "@unit": mediainfo["mediainfo.info.overallBitRateUnit"],
                    "#value": mediainfo["mediainfo.info.overallBitRate"],
                  },
                ],
                "ebucore:dateCreated": [
                  {
                    "@startDate": "2023-11-07",
                    "@startTime": "21:18:36",
                  },
                ],
                "ebucore:dateModified": [
                  {
                    "@startDate": "2023-11-07",
                    "@startTime": "21:19:33",
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    try {
      if (!metadata) {
        console.error("Invalid input: metadata is missing.");
        return;
      }

      if (!sidecarfile) {
        console.error("Invalid input: sidecarfile is missing.");
        return;
      }

      console.log("Sidecarfile successfully synced!");
      return sidecarfile;
    } catch (error) {
      console.warn("Sidecarfile error syncing:", error.message);
    }
  }
}

module.exports = {
  SyncHelper,
};
