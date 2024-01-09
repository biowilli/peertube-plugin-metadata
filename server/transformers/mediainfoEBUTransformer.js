const { toBool } = require("./utils");

const ebucoreInfoStream = {
  "ebucore:format__ebucore:containerFormat__ebucore:containerEncoding__@formatLabel":
    ["info", "containerEncoding", (val) => val],
  "ebucore:format__ebucore:containerFormat__@containerFormatName": [
    ["info", "containerFormatName", (val) => val],
  ],
  "ebucore:format__ebucore:containerFormat__@containerFormatVersionId": [
    ["info", "containerFormatVersionId", (val) => val],
  ],
  "ebucore:format__ebucore:containerFormat__@containerFormatId": [
    ["info", "containerFormatId", (val) => val],
  ],

  "ebucore:format__ebucore:containerFormat__ebucore:technicalAttributeString__@typeLabel:WritingApplication__#value":
    ["info", "containerWritingApplication", (val) => val],
  "ebucore:format__ebucore:containerFormat__ebucore:technicalAttributeString__@typeLabel:WritingLibrary__#value":
    ["info", "containerWritingLibrary", (val) => val],

  "ebucore:format__ebucore:duration__ebucore:normalPlayTime__#value": [
    ["info", "durationEBUCore", (val) => val],
  ],

  "ebucore:format__ebucore:fileSize__#value": [
    ["info", "fileSize", (val) => parseInt(val)],
  ],
  "ebucore:format__ebucore:fileName__#value": [
    ["info", "fileName", (val) => val],
  ],
  "ebucore:format__ebucore:locator__#value": [
    ["info", "filePath", (val) => val],
  ],

  "ebucore:format__ebucore:technicalAttributeInteger__@typeLabel:OverallBitRate__@unit":
    ["info", "overallBitRateUnit", (val) => val],
  "ebucore:format__ebucore:technicalAttributeInteger__@typeLabel:OverallBitRate__#value":
    ["info", "overallBitRate", (val) => parseInt(val)],

  "ebucore:format__ebucore:dateCreated__@startDate": [
    ["info", "dateCreatedDate", (val) => val],
  ],
  "ebucore:format__ebucore:dateCreated__@startTime": [
    ["info", "dateCreatedTime", (val) => val],
  ],
};

const ebucoreVideoStreamPropertyTransformer = {
  "ebucore:format__ebucore:videoFormat": [
    ["video", "create_container", (val) => ({})],
  ],
  "ebucore:format__ebucore:videoFormat__@videoFormatName": [
    ["video", "format", (val) => val],
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:width__@unit": [
    ["video", "widthUnit", (val) => val],
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:width__#value": [
    ["video", "width", (val) => parseInt(val)],
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:height__@unit": [
    ["video", "heightUnit", (val) => val],
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:height__#value": [
    ["video", "height", (val) => parseInt(val)],
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:frameRate__@factorNumerator": [
    ["video", "frameRateNum", (val) => parseInt(val)],
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:frameRate__@factorDenominator":
    [["video", "frameRateDen", (val) => parseInt(val)]],
  "ebucore:format__ebucore:videoFormat__ebucore:frameRate__#value": [
    ["video", "frameRateBase", (val) => parseInt(val)],
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:aspectRatio__@typeLabel": [
    ["video", "aspectRatioType", (val) => val],
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:aspectRatio__@typeLabel:display__ebucore:factorNumerator__#value":
    [["video", "aspectRatioNum", (val) => parseInt(val)]],
  "ebucore:format__ebucore:videoFormat__ebucore:aspectRatio__@typeLabel:display__ebucore:factorDenominator__#value":
    [["video", "aspectRatioDen", (val) => parseInt(val)]],

  "ebucore:format__ebucore:videoFormat__ebucore:videoEncoding__@typeLabel": [
    ["video", "encoding", (val) => val],
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:codec__ebucore:codecIdentifier__dc:identifier__#value":
    [["video", "codecID", (val) => val]],
  "ebucore:format__ebucore:videoFormat__ebucore:codec__ebucore:name__#value": [
    ["video", "codecIDName", (val) => val],
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:bitRate__#value": [
    ["video", "bitRate", (val) => parseInt(val)],
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:videoTrack__@trackId": [
    ["video", "id", (val) => parseInt(val)],
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:ColorSpace__#value":
    ["video", "colorSpace", (val) => val],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:ChromaSubsampling__#value":
    ["video", "chromaSubsampling", (val) => val],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:colour_primaries__#value":
    ["video", "colorPrimaries", (val) => val],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:transfer_characteristics__#value":
    ["video", "transferCharacteristics", (val) => val],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:matrix_coefficients__#value":
    ["video", "matrixCoefficients", (val) => val],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:colour_range__#value":
    ["video", "colorRange", (val) => val],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:WritingLibrary__#value":
    [
      ["video", "encodedLibraryName", (val) => val.split(" ", 1)[0]],
      [
        "video",
        "encodedLibraryVersion",
        (val) => {
          const parts = val.split(" ", 2);
          return parts.length > 1 ? parts[1] : null;
        },
      ],
    ],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:Default__#value":
    ["video", "default", (val) => toBool(val)],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:Forced__#value":
    ["video", "forced", (val) => toBool(val)],

  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeInteger__@typeLabel:BitDepth__@unit":
    ["video", "bitDepthUnit", (val) => val],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeInteger__@typeLabel:BitDepth__#value":
    ["video", "bitDepth", (val) => parseInt(val)],

  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeInteger__@typeLabel:StreamSize__@unit":
    ["video", "streamSizeUnit", (val) => val],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeInteger__@typeLabel:StreamSize__#value":
    ["video", "streamSize", (val) => parseInt(val)],
};

const ebuAudioStreamPropertyTransformer = {
  "ebucore:format__ebucore:audioFormat": [
    ["audio", "create_container", (val) => ({})],
  ],
  "ebucore:format__ebucore:audioFormat__@audioFormatName": [
    ["audio", "format", (val) => val],
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:audioEncoding__@typeLabel": [
    ["audio", "encoding", (val) => val],
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:audioEncoding__@typeLink": [
    ["audio", "encodingUrl", (val) => val],
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:codec__ebucore:codecIdentifier__dc:identifier__#value":
    [["audio", "codecID", (val) => val]],
  "ebucore:format__ebucore:audioFormat__ebucore:codec__ebucore:name__#value": [
    ["audio", "codecIDName", (val) => val],
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:samplingRate__#value": [
    ["audio", "samplingRate", (val) => parseInt(val)],
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:bitRate__#value": [
    ["audio", "bitRate", (val) => parseInt(val)],
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:bitRateMode__#value": [
    [
      "audio",
      "bitRateMode",
      (val) => (val.toLowerCase() === "constant" ? "CBR" : "VBR"),
    ],
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:audioTrack__@trackId": [
    ["audio", "id", (val) => parseInt(val)],
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:audioTrack__@trackLanguage": [
    ["audio", "languageCode", (val) => val],
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:channels__#value": [
    ["audio", "channels", (val) => parseInt(val)],
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeString__@typeLabel:ChannelPositions__#value":
    [["audio", "channelPositions", (val) => val]],
  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeString__@typeLabel:ChannelLayout__#value":
    [["audio", "channelLayout", (val) => val]],
  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeString__@typeLabel:Endianness__#value":
    [["audio", "formatSettingsEndianness", (val) => val]],

  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeInteger__@typeLabel:StreamSize__@unit":
    [["audio", "streamSizeUnit", (val) => val]],
  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeInteger__@typeLabel:StreamSize__#value":
    [["audio", "streamSize", (val) => parseInt(val)]],
};

const ebucoreTextStreamPropertyTransformer = {
  "ebucore:format__ebucore:dataFormat": [
    ["text", "create_container", (val) => ({})],
  ],
  "ebucore:format__ebucore:dataFormat__@dataFormatName": [
    ["text", "format", (val) => val],
  ],
  "ebucore:format__ebucore:dataFormat__@dataTrackId": [
    ["text", "id", (val) => parseInt(val)],
  ],

  "ebucore:format__ebucore:dataFormat__ebucore:captioningFormat__@language": [
    ["text", "languageCode", (val) => val],
  ],
  "ebucore:format__ebucore:dataFormat__ebucore:captioningFormat__@typeLabel": [
    ["text", "typeLabel", (val) => val],
  ],

  "ebucore:format__ebucore:dataFormat__ebucore:codec__ebucore:codecIdentifier__dc:identifier__#value":
    [["text", "codecID", (val) => val]],
};

module.exports = {
  ebucoreInfoStream,
  ebucoreVideoStreamPropertyTransformer,
  ebuAudioStreamPropertyTransformer,
  ebucoreTextStreamPropertyTransformer,
};
