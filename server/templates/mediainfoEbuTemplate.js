//in utils
const dtNow = new Date();

function formatNumber(num) {
  return num.toString().padStart(2, "0");
}

//TODO check if this could be better
const now_date = `${dtNow.getFullYear()}-${formatNumber(
  dtNow.getMonth() + 1
)}-${formatNumber(dtNow.getDate())}`;
const now_time = `${formatNumber(dtNow.getHours())}:${formatNumber(
  dtNow.getMinutes()
)}:${formatNumber(dtNow.getSeconds())}Z`;

let prerender_video = undefined;
let prerender_audio = undefined;
let containerFormatName = undefined;
let containerFormatVersionId = undefined;
let containerFormatId = undefined;
let containerEncoding = undefined;
let containerWritingApplication = undefined;
let containerWritingLibrary = undefined;
let prerender_text = undefined;
let durationEBUCore = undefined;
let fileSize = undefined;
let fileName = undefined;
let filePath = undefined;
let overallBitRate = undefined;
let overallBitRateUnit = undefined;
let dateCreatedDate = undefined;
let dateCreatedTime = undefined;

let format = undefined; // Dies könnte für mehrere Felder verwendet werden
let width = undefined;
let height = undefined;
let frameRateNum = undefined;
let frameRateDen = undefined;
let frameRateBase = undefined;
let displayAspectRatioNum = undefined;
let displayAspectRatioDen = undefined;
let encoding = undefined; // Dies könnte für mehrere Felder verwendet werden
let codecID = undefined;
let bitRate = undefined;
let id = undefined;
let colorSpace = undefined;
let chromaSubsampling = undefined;
let colorPrimaries = undefined;
let transferCharacteristics = undefined;
let matrixCoefficients = undefined;
let colorRange = undefined;
let encodedLibraryName = undefined;
let encodedLibraryVersion = undefined;
let defaultFlag = undefined;
let forcedFlag = undefined;
let bitDepth = undefined;
let streamSize = undefined;

let languageCode = undefined;
let channels = undefined;
let channelPositions = undefined;
let channelLayout = undefined;
let formatSettingsEndianness = undefined;
let streamSizeUnit = undefined;

let codecIDName = undefined;
let samplingRate = undefined;
let bitRateMode = undefined;
let typeLabel = undefined;

let colorDescriptionPresent = undefined;
let encodingUrl = undefined;
const ebuTemplate = {
  main: {
    "ebucore:ebuCoreMain": {
      "@version": "1.8",
      "@writingLibraryName": "MediaInfoLib",
      "@writingLibraryVersion": "21.09",
      "@dateLastModified": now_date,
      "@timeLastModified": now_time,
      "ebucore:coreMetadata": [
        {
          "ebucore:format": [
            {
              "ebucore:videoFormat": [prerender_video],
              "ebucore:audioFormat": [prerender_audio],
              "ebucore:containerFormat": [
                {
                  "@containerFormatName": containerFormatName,
                  "@containerFormatVersionId": containerFormatVersionId,
                  "@containerFormatId": containerFormatId,
                  "ebucore:containerEncoding": [
                    {
                      "@formatLabel": containerEncoding,
                    },
                  ],
                  "ebucore:technicalAttributeString": [
                    {
                      "@typeLabel": "WritingApplication",
                      "#value": containerWritingApplication,
                    },
                    {
                      "@typeLabel": "WritingLibrary",
                      "#value": containerWritingLibrary,
                    },
                  ],
                },
              ],
              "ebucore:dataFormat": [prerender_text],
              "ebucore:duration": [
                {
                  "ebucore:normalPlayTime": [
                    {
                      "#value": durationEBUCore,
                    },
                  ],
                },
              ],
              "ebucore:fileSize": [
                {
                  "#value": fileSize,
                },
              ],
              "ebucore:fileName": [
                {
                  "#value": fileName,
                },
              ],
              "ebucore:locator": [
                {
                  "#value": filePath,
                },
              ],
              "ebucore:technicalAttributeInteger": [
                {
                  "@typeLabel": "OverallBitRate",
                  "@unit": overallBitRateUnit,
                  "#value": overallBitRate,
                },
              ],
              "ebucore:dateCreated": [
                {
                  "@startDate": dateCreatedDate,
                  "@startTime": dateCreatedTime,
                },
              ],
            },
          ],
        },
      ],
    },
  },

  video: {
    "@videoFormatName": "format",
    "ebucore:width": [
      {
        "@unit": "pixel",
        "#value": width,
      },
    ],
    "ebucore:height": [
      {
        "@unit": "pixel",
        "#value": height,
      },
    ],
    "ebucore:frameRate": [
      {
        "@factorNumerator": frameRateNum,
        "@factorDenominator": frameRateDen,
        "#value": frameRateBase,
      },
    ],
    "ebucore:aspectRatio": [
      {
        "@typeLabel": "display",
        "ebucore:factorNumerator": [
          {
            "#value": displayAspectRatioNum,
          },
        ],
        "ebucore:factorDenominator": [
          {
            "#value": displayAspectRatioDen,
          },
        ],
      },
    ],
    "ebucore:videoEncoding": [
      {
        "@typeLabel": encoding,
      },
    ],
    "ebucore:codec": [
      {
        "ebucore:codecIdentifier": [
          {
            "dc:identifier": [
              {
                "#value": codecID,
              },
            ],
          },
        ],
      },
    ],
    "ebucore:bitRate": [
      {
        "#value": bitRate,
      },
    ],
    "ebucore:videoTrack": [
      {
        "@trackId": id,
      },
    ],
    "ebucore:technicalAttributeString": [
      {
        "@typeLabel": "ColorSpace",
        "#value": colorSpace,
      },
      {
        "@typeLabel": "ChromaSubsampling",
        "#value": chromaSubsampling,
      },
      ...(colorDescriptionPresent
        ? [
            {
              "@typeLabel": "colour_primaries",
              "#value": colorPrimaries,
            },
          ]
        : []),
      ...(colorDescriptionPresent
        ? [
            {
              "@typeLabel": "transfer_characteristics",
              "#value": transferCharacteristics,
            },
          ]
        : []),
      ...(colorDescriptionPresent
        ? [
            {
              "@typeLabel": "matrix_coefficients",
              "#value": matrixCoefficients,
            },
          ]
        : []),
      ...(colorDescriptionPresent
        ? [
            {
              "@typeLabel": "colour_range",
              "#value": colorRange,
            },
          ]
        : []),
      {
        "@typeLabel": "WritingLibrary",
        "#value": `${encodedLibraryName} ${encodedLibraryVersion}`,
      },
      {
        "@typeLabel": "Default",
        "#value": defaultFlag ? "Yes" : "No",
      },
      {
        "@typeLabel": "Forced",
        "#value": forcedFlag ? "Yes" : "No",
      },
    ],
    "ebucore:technicalAttributeInteger": [
      {
        "@typeLabel": "BitDepth",
        "@unit": "bit",
        "#value": bitDepth,
      },
      {
        "@typeLabel": "StreamSize",
        "@unit": "byte",
        "#value": streamSize,
      },
    ],
  },

  audio: {
    "@audioFormatName": format,
    "ebucore:audioEncoding": [
      {
        "@typeLabel": `${encoding}`,
        ...(encodingUrl ? { "@typeLink": encodingUrl } : {}), //URL: https://stackoverflow.com/a/54150674/9921564
      },
    ],
    "ebucore:codec": [
      {
        "ebucore:codecIdentifier": [
          {
            "dc:identifier": [
              {
                "#value": codecID,
              },
            ],
          },
        ],
        "ebucore:name": [
          {
            "#value": codecIDName,
          },
        ],
      },
    ],
    "ebucore:samplingRate": [
      {
        "#value": "${samplingRate}",
      },
    ],
    "ebucore:bitRate": [
      {
        "#value": "${bitRate}",
      },
    ],
    "ebucore:bitRateMode": [
      {
        "#value": bitRateMode === "CBR" ? "constant" : "variable",
      },
    ],
    "ebucore:audioTrack": [
      {
        "@trackId": id,
        "@trackLanguage": languageCode,
      },
    ],
    "ebucore:channels": [
      {
        "#value": channels,
      },
    ],
    "ebucore:technicalAttributeString": [
      {
        "@typeLabel": "ChannelPositions",
        "#value": channelPositions,
      },
      {
        "@typeLabel": "ChannelLayout",
        "#value": channelLayout,
      },
      {
        "@typeLabel": "Endianness",
        "#value": formatSettingsEndianness,
      },
    ],
    "ebucore:technicalAttributeInteger": [
      {
        "@typeLabel": "StreamSize",
        "@unit": streamSizeUnit,
        "#value": streamSize,
      },
    ],
  },

  text: {
    "@dataFormatName": format,
    "@dataTrackId": id,
    "ebucore:captioningFormat": [
      {
        "@captioningFormatName": format,
        "@trackId": id,
        "@language": "${languageCode}",
        ...(typeLabel ? { "@typeLabel": typeLabel } : {}), //URL: https://stackoverflow.com/a/54150674/9921564
      },
    ],
    "ebucore:codec": [
      {
        "ebucore:codecIdentifier": [
          {
            "dc:identifier": [
              {
                "#value": codecID,
              },
            ],
          },
        ],
      },
    ],
  },
};

module.exports = {
  ebuTemplate,
};
