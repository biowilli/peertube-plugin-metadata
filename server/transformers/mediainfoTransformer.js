const {
  toBool,
  toList,
  getNumerator,
  getDenominator,
  toDateTime,
} = require("./utils");

const infoStreamPropertyTransformer = [
  ["UniqueID", "UniqueID", (val) => val],

  ["StreamCount", "streamCount", (val) => parseInt(val)],
  ["VideoCount", "videoCount", (val) => parseInt(val)],
  ["AudioCount", "audioCount", (val) => parseInt(val)],
  ["TextCount", "textCount", (val) => parseInt(val)],
  ["MenuCount", "menuCount", (val) => parseInt(val)],

  ["Video_Format_List", "videoFormat", (val) => toList(val)],
  ["Video_Codec_List", "videoCodec", (val) => toList(val)],
  ["Video_Language_List", "videoLanguage", (val) => toList(val)],

  ["Audio_Format_List", "audioFormat", (val) => toList(val)],
  ["Audio_Codec_List", "audioCodec", (val) => toList(val)],
  ["Audio_Language_List", "audioLanguage", (val) => toList(val)],

  ["Text_Format_List", "textFormat", (val) => toList(val)],
  ["Text_Codec_List", "textCodec", (val) => toList(val)],
  ["Text_Language_List", "textLanguage", (val) => toList(val)],

  ["CompleteName", "filePath", (val) => val],
  ["FolderName", "folderName", (val) => val],
  //["FileNameExtension", "FileNameExtension", (val) => val],
  ["FileName", "fileName", (val) => val],
  ["FileExtension", "fileExtension", (val) => val],

  ["Format", "format", (val) => val],
  ["Format_Extensions", "formatExtensions", (val) => toList(val, " ")],
  ["Format_Profile", "formatProfile", (val) => val],
  ["InternetMediaType", "internetMediaType", (val) => val],
  ["CodecID", "codecID", (val) => val],
  ["CodecID_Url", "codecIDUrl", (val) => val],
  ["CodecID_Compatible", "codecIDCompatible", (val) => val],

  ["FileSize", "fileSize", (val) => parseInt(val)],
  ["FileSize_String", "fileSizeFormated", (val) => val],

  ["Duration", "duration", (val) => parseFloat(val)],
  ["Duration_String3", "durationFormated", (val) => val],
  ["Duration_String4", "durationSMTP", (val) => val],

  ["OverallBitRate_Mode", "overallBitRateMode", (val) => val],
  ["OverallBitRate", "overallBitRate", (val) => parseInt(val)],

  ["FrameRate", "frameRate", (val) => parseFloat(val)],
  ["FrameCount", "frameCount", (val) => parseInt(val)],
  ["StreamSize", "streamSize", (val) => parseInt(val)],
  ["HeaderSize", "headerSize", (val) => parseInt(val)],
  ["DataSize", "dataSize", (val) => parseInt(val)],
  ["FooterSize", "footerSize", (val) => parseInt(val)],
  ["IsStreamable", "isStreamable", (val) => (val) => toBool(val)(val)],

  ["Title", "title", (val) => val],
  ["Movie", "movie", (val) => val],
  ["Performer", "performer", (val) => val],
  ["Genre", "genre", (val) => val],

  ["Encoded_Date", "encoded_Date", (val) => toDateTime(val)],
  ["Tagged_Date", "tagged_Date", (val) => toDateTime(val)],
  ["File_Modified_Date", "fileModifiedDate", (val) => toDateTime(val)],
];

const commonStreamPropertyTransformers = [
  ["UniqueID", "uuid", (val) => val],
  ["ID", "id", (val) => parseInt(val)],
  ["StreamCount", "streamCount", (val) => parseInt(val)],
  ["StreamOrder", "streamOrder", (val) => parseInt(val)],
  ["@typeorder", "typeOrder", (val) => parseInt(val)],
];

const commonMediaStreamPropertyTransformer = [
  ["Format", "format", (val) => val],
  ["CodecID", "codecID", (val) => val],

  ["Duration", "duration", (val) => parseFloat(val)],
  ["Duration_String3", "durationFormated", (val) => val],

  ["BitRate", "bitRate", (val) => parseInt(val)],

  ["FrameRate", "frameRate", (val) => parseFloat(val)],
  ["FrameCount", "frameCount", (val) => parseInt(val)],

  ["StreamSize", "streamSize", (val) => parseInt(val)],

  ["Language", "languageCode", (val) => val],
  ["Language_String3", "languageCode3", (val) => val],
  ["Language_String", "language", (val) => val],

  ["Default", "default", (val) => toBool(val)],
  ["Forced", "forced", (val) => toBool(val)],
];

const videoStreamPropertyTransformer = [
  ["Format_Commercial", "codecIDName", (val) => val],

  ["Format_Url", "formatUrl", (val) => val],
  ["Format_Profile", "formatProfile", (val) => val],
  ["Format_Level", "formatLevel", (val) => val],
  ["Format_Tier", "formatTier", (val) => val],

  ["Format_Settings", "formatSettings", (val) => val],
  ["Format_Settings_CABAC", "formatSettingsCABAC", (val) => toBool(val)],
  [
    "Format_Settings_RefFrames",
    "formatSettingsRefFrames",
    (val) => parseInt(val),
  ],
  ["Format_Settings_GOP", "formatSettingsGOP", (val) => val],

  ["InternetMediaType", "internetMediaType", (val) => val],

  ["FileName", "fileName", (val) => val],
  ["FileExtension", "fileExtension", (val) => val],

  ["Duration_String4", "durationSMTP", (val) => val],

  ["Delay", "delay", (val) => parseFloat(val)],
  ["Delay_String3", "delayFormated", (val) => val],
  ["Delay_Source", "delaySource", (val) => val],

  ["Width", "width", (val) => parseInt(val)],
  ["Height", "height", (val) => parseInt(val)],
  ["Stored_Height", "storedHeight", (val) => parseInt(val)],
  ["Sampled_Width", "sampledWidth", (val) => parseInt(val)],
  ["Sampled_Height", "sampledHeight", (val) => parseInt(val)],

  ["PixelAspectRatio", "pixelAspectRatio", (val) => parseFloat(val)],
  ["DisplayAspectRatio", "displayAspectRatio", (val) => parseFloat(val)],
  ["DisplayAspectRatio_String", "displayAspectRatioString", (val) => val],
  [
    "DisplayAspectRatio_String",
    "displayAspectRatioNum",
    (val) => getNumerator(val),
  ],
  [
    "DisplayAspectRatio_String",
    "displayAspectRatioDen",
    (val) => getDenominator(val),
  ],

  ["Rotation", "rotation", (val) => parseFloat(val)],

  ["FrameRate_Mode", "frameRateMode", (val) => val],
  [
    "FrameRate_Num",
    "frameRateBase",
    (val) => Math.floor(parseFloat(val) * 0.001),
  ],
  ["FrameRate_Num", "frameRateNum", (val) => 1000],
  ["FrameRate_Den", "frameRateDen", (val) => parseInt(val)],

  ["ColorSpace", "colorSpace", (val) => val],
  ["ChromaSubsampling", "chromaSubsampling", (val) => val],
  ["BitDepth", "bitDepth", (val) => parseInt(val)],
  ["ScanType", "scanType", (val) => val],

  [
    "colour_description_present",
    "colorDescriptionPresent",
    (val) => toBool(val),
  ],
  ["colour_range", "colorRange", (val) => val],
  ["colour_primaries", "colorPrimaries", (val) => val],
  ["transfer_characteristics", "transferCharacteristics", (val) => val],
  ["matrix_coefficients", "matrixCoefficients", (val) => val],

  ["Encoded_Library_Name", "encodedLibraryName", (val) => val],
  ["Encoded_Library_Version", "encodedLibraryVersion", (val) => val],
  //['Encoded_Library_Settings', 'encodedLibrarySettings', (val) => val],

  ["Encoded_Date", "encodedDate", (val) => toDateTime(val)],
  ["Tagged_Date", "taggedDate", (val) => toDateTime(val)],
];

const audioStreamPropertyTransformer = [
  ["Format_Commercial", "codecIDName", (val) => val],

  ["Format_Url", "formatUrl", (val) => val],
  ["Format_AdditionalFeatures", "formatAdditionalFeatures", (val) => val],
  ["Format_Settings_Endianness", "formatSettingsEndianness", (val) => val],

  ["Duration_String4", "durationSMTP", (val) => val],

  ["Source_Duration", "sourceDuration", (val) => parseFloat(val)],
  ["Source_Duration_String3", "sourceDurationFormated", (val) => val],

  ["Delay", "delay", (val) => parseFloat(val)],
  ["Delay_String3", "delayFormated", (val) => val],
  ["Delay_Source", "delaySource", (val) => val],

  ["Video_Delay", "videoDelay", (val) => parseFloat(val)],
  ["Video_Delay_String3", "videoDelayFormated", (val) => val],

  ["BitRate_Mode", "bitRateMode", (val) => val],
  ["BitRate_Maximum", "bitRateMaximum", (val) => parseInt(val)],

  ["Channels", "channels", (val) => parseInt(val)],
  ["ChannelPositions", "channelPositions", (val) => val],
  ["ChannelPositions_String2", "channelPositionsFormated", (val) => val],
  ["ChannelLayout", "channelLayout", (val) => val],

  ["SamplesPerFrame", "samplesPerFrame", (val) => parseInt(val)],
  ["SamplingRate", "samplingRate", (val) => parseInt(val)],
  ["SamplingCount", "samplingCount", (val) => parseInt(val)],

  ["Source_FrameCount", "sourceFrameCount", (val) => parseInt(val)],
  ["Compression_Mode", "compressionMode", (val) => val],
  ["Source_StreamSize", "sourceStreamSize", (val) => parseInt(val)],
  ["ServiceKind", "serviceKind", (val) => val],

  ["Encoded_Date", "encodedDate", (val) => toDateTime(val)],
  ["Tagged_Date", "taggedDate", (val) => toDateTime(val)],
];

const textStreamPropertyStreamTransfomer = [
  ["CodecID_Info", "codecIDName", (val) => val],
  ["ElementCount", "elementCount", (val) => parseInt(val)],
  ["Title", "title", (val) => val],
];

var menuStreamPropertyTransformer = [
  ["Chapters_Pos_Begin", "chaptersPosBegin", (val) => parseInt(val)],
  ["Chapters_Pos_End", "chaptersPosEnd", (val) => parseInt(val)],
];

module.exports = {
  infoStreamPropertyTransformer,
  commonStreamPropertyTransformers,
  commonMediaStreamPropertyTransformer,
  videoStreamPropertyTransformer,
  audioStreamPropertyTransformer,
  textStreamPropertyStreamTransfomer,
  menuStreamPropertyTransformer,
};
