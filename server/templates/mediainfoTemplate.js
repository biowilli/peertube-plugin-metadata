const infoStreamTemplate = {
  uuid: null,

  streamCount: null,
  videoCount: 0,
  audioCount: 0,
  textCount: 0,
  menuCount: 0,

  videoFormat: null,
  videoCodec: null,
  videoLanguage: null,

  audioFormat: null,
  audioCodec: null,
  audioLanguage: null,

  textFormat: null,
  textCodec: null,
  textLanguage: null,

  filePath: null,
  folderName: null,
  // fileNameExtension: null,
  fileName: null,
  fileExtension: null,

  format: null,
  formatExtensions: null,
  formatProfile: null,
  internetMediaType: null,
  codecID: null,
  codecIDUrl: null,
  codecIDCompatible: null,

  fileSize: 0,
  fileSizeFormatted: null,

  duration: 0.0,
  durationFormatted: null,
  durationSMTP: null,
  durationEBUCore: null,

  overallBitRateMode: null,
  overallBitRate: null,
  overallBitRateUnit: "bps",

  frameRate: 0.0,
  frameCount: 0,
  streamSize: 0,
  headerSize: 0,
  dataSize: 0,
  footerSize: 0,
  isStreamable: false,

  title: null,
  movie: null,
  performer: null,
  genre: null,

  encodedDate: null,
  taggedDate: null,
  fileModifiedDate: null,
};

const commonStreamTemplate = {
  uuid: null,
  id: null,
  streamCount: 0,
  streamOrder: 0,
  typeOrder: 0,
};

const commonMediaStreamTemplate = {
  format: null,
  codecID: null,

  duration: 0.0,
  durationFormatted: null,

  bitRate: null,

  frameRate: 0.0,
  frameCount: 0,

  streamSize: 0,
  streamSizeUnit: "byte",

  languageCode: null,
  languageCode3: null,
  language: null,

  default: false,
  forced: false,
};

const videoStreamTemplate = {
  codecIDName: null,
  encoding: null,
  encodingUrl: null,

  formatUrl: null,
  formatProfile: null,
  formatLevel: null,
  formatTier: null,

  formatSettings: null,
  formatSettingsCABAC: false,
  formatSettingsRefFrames: null,
  formatSettingsGOP: null,

  internetMediaType: null,

  fileName: null,
  fileExtension: null,

  durationSMTP: null,
  durationEBUCore: null,

  delay: 0.0,
  delayFormatted: null,
  delaySource: null,

  width: null,
  widthUnit: "pixel",
  height: null,
  heightUnit: "pixel",
  storedHeight: null,
  sampledWidth: null,
  sampledHeight: null,

  pixelAspectRatio: null,
  displayAspectRatio: null,
  displayAspectRatioString: null,
  displayAspectRatioNum: null,
  displayAspectRatioDen: null,

  rotation: 0.0,

  frameRateMode: null,
  frameRateBase: null,
  frameRateNum: null,
  frameRateDen: null,

  colorSpace: null,
  chromaSubsampling: null,
  bitDepth: 0,
  bitDepthUnit: "bit",
  scanType: null,

  colorDescriptionPresent: false,
  colorRange: null,
  colorPrimaries: null,
  transferCharacteristics: null,
  matrixCoefficients: null,

  encodedLibraryName: null,
  encodedLibraryVersion: null,
  // encodedLibrarySettings: null,

  encodedDate: null,
  taggedDate: null,
};

const audioStreamTemplate = {
  codecIDName: null,
  encoding: null,
  encodingUrl: null,

  formatUrl: null,
  formatAdditionalFeatures: null,
  formatSettingsEndianness: null,

  durationSMTP: null,
  durationEBUCore: null,

  sourceDuration: 0.0,
  sourceDurationFormatted: null,

  delay: 0.0,
  delayFormatted: null,
  delaySource: null,

  videoDelay: 0.0,
  videoDelayFormatted: null,

  bitRateMode: null,
  bitRateMaximum: 0,

  channels: 0,
  channelPositions: null,
  channelPositionsFormatted: null,
  channelLayout: null,

  samplesPerFrame: 0,
  samplingRate: 0,
  samplingCount: 0,

  sourceFrameCount: 0,
  compressionMode: null,
  sourceStreamSize: 0,
  serviceKind: null,

  encodedDate: null,
  taggedDate: null,
};

const textStreamTemplate = {
  codecIDName: null,
  elementCount: 0,
  title: null,
  typeLabel: null,
};

const menuStreamTemplate = {
  chaptersPosBegin: 0,
  chaptersPosEnd: 0,
  extra: null,
};

module.exports = {
  infoStreamTemplate,
  commonStreamTemplate,
  commonMediaStreamTemplate,
  videoStreamTemplate,
  audioStreamTemplate,
  textStreamTemplate,
  menuStreamTemplate,
};
