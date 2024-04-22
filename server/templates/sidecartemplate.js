async function getCreatorRoles(metadata) {
  return {
    presenter: metadata["show.role.presenter"],
    guests: metadata["show.role.guests"],
    crew: metadata["show.role.crew"],
  };
}

async function getContributorRoles(metadata) {
  return {
    contributor: metadata["show.role.contributor"],
  };
}

async function filterCreatorsByRole(allCreator, role) {
  return allCreator.filter((creator) => role.includes(creator.id));
}

const sanitizeValue = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === "null" ||
    value === "undefined"
  ) {
    return "";
  } else {
    return value;
  }
};

function formatCreator(creator) {
  let fullName =
    creator.name !== null && creator.name !== undefined ? creator.name : "";
  +(creator.familyname !== null && creator.familyname !== undefined
    ? " " + creator.familyname
    : "");

  return {
    contactDetails: {
      name: fullName.trim(),
      username: sanitizeValue(creator.username),
      occupation: sanitizeValue(creator.occupation),
    },
    organisationDetails: {
      organisationName: "",
      organisationCode: "",
      organisationDepartment: "",
    },
    role: creator.role,
  };
}

async function formatCreators(allCreators, roles) {
  let formattedCreators = [];
  for (let role in roles) {
    let filteredCreators = await filterCreatorsByRole(allCreators, roles[role]);
    let formattedRoleCreators = filteredCreators.map(formatCreator);
    formattedCreators = formattedCreators.concat(formattedRoleCreators);
  }
  return formattedCreators;
}

async function getAllFormattedCreators(metadata, creatorDAO) {
  const creatorRoles = await getCreatorRoles(metadata);
  const allCreators = await creatorDAO.getAllCreators();
  return await formatCreators(allCreators, creatorRoles);
}

async function getAllFormattedContributors(metadata, creatorDAO) {
  const contributorRoles = await getContributorRoles(metadata);
  const allContributor = await creatorDAO.getAllCreators();
  return await formatCreators(allContributor, contributorRoles);
}

async function getAllFormattedOrganizations(metadata, organizationDAO) {
  var producerRole = metadata["show.role.producer"];
  var allOrganization = await organizationDAO.getAllOrganizations();
  var organizationProducer = allOrganization.filter((organization) =>
    producerRole.includes(organization.id)
  );

  return organizationProducer.map((producer) => ({
    organisationDetails: {
      organisationName: producer.name,
      organisationDepartment: "",
      details: {
        emailAddress: "",
        webAddress: "",
        address: {
          addressLine: ["", "", "", ""],
          addressTownCity: "",
          country: "",
        },
        telephoneNumber: "",
      },
    },
    role: "producer",
  }));
}

async function getMetadataFilledInSidecarfile(
  metadata,
  creatorDAO,
  organizationDAO,
  videoLicenceManager
) {
  var metadata = JSON.parse(metadata);
  console.log("metadata sidecartest", metadata);

  const coreMetadataTemplate = await getCoreMetadataTemplate(
    metadata,
    creatorDAO,
    organizationDAO,
    videoLicenceManager
  );
  console.log("coreMetadataTemplate", coreMetadataTemplate);
  const metadataProviderTemplate = getMetadataProviderTemplate(metadata);
  console.log("metadataProviderTemplate", metadataProviderTemplate);
  const formatTemplate = getFormatTemplate(metadata);
  console.log("formatTemplate", formatTemplate);

  const sidecarfiletemplate = {
    "ebucore:ebuCoreMain": {
      version: 1.9,
      coreMetadata: coreMetadataTemplate,
      metadataProvider: metadataProviderTemplate,
      "ebucore:format": formatTemplate,
    },
  };
  console.log(sidecarfiletemplate);
  return sidecarfiletemplate;
}

async function getCoreMetadataTemplate(
  metadata,
  creatorDAO,
  organizationDAO,
  videoLicenceManager
) {
  let shortcode = {
    title: metadata["show.title.note"],
  };

  const creator = await getAllFormattedCreators(metadata, creatorDAO);
  const contributors = getAllFormattedContributors(metadata, creatorDAO);
  const publisher = await getAllFormattedOrganizations(
    metadata,
    organizationDAO
  );

  let subject = [
    {
      subject: metadata["show.description.subject"],
      subjectCode: metadata["show.description.subjectCode"],
    },
  ];

  //TODO: tags FS1 checkt
  let tags = metadata["show.description.tags"];
  let oldTags = metadata["show.description.oldtags"];

  console.log("tags", tags);
  console.log("oldTags", oldTags);

  let type = {
    objectType: "Series",
    series: {
      season: metadata["show.season"],
      episode: metadata["show.episode"],
    },
    genre: "",
    type: metadata["show.type"],
    targetAudience: metadata["show.targetgroup"],
  };

  let dates = {
    created: metadata["mediainfo.info.dateCreatedDate"],
    issued: metadata["dates.issued.firstIssued"],
    modified: metadata["mediainfo.info.fileModifiedDate"],
    recorded: metadata["dates.coverage.daterecorded"],
    digitalised: metadata["dates.dateDigitalised"],
  };

  let formatCoreMetadata = [
    {
      locator: metadata["show.source"],
    },
    {
      duration: {
        editUnitNumber: metadata["mediainfo.info.duration"],
      },
      locator: metadata["archiveData.archiveFilePath"],
    },
  ];

  //not used yet
  let coverage = {
    spatial: {
      location: [
        {
          name: "",
        },
        {
          name: "",
          code: "",
        },
      ],
    },
  };

  const organisationName =
    publisher[0]?.organisationDetails?.organisationName ?? "";
  const rightId = metadata["rights.copyright.rightId"];
  const licences = videoLicenceManager.getConstants();
  const rightName = licences[rightId];

  let rigthsTemplate = [
    {
      rights: metadata["rights.copyright.exploitationIssues"],
      disclaimer: metadata["rights.copyright.disclaimer"],
      clearanceFlag: metadata["rights.copyright.rightClearanceFlag"],
      rightsHolder: {
        organisationDetails: {
          organisationName: organisationName,
        },
        dates: {
          startDate: "",
          endDate: "",
        },
      },
    },
    {
      rights: rightName,
      rightsID: rightId,
      rightsHolder: "",
    },
  ];

  let rating = {
    ratingScaleMax: metadata["show.rating.ratingScaleMaxValue"],
    ratingScaleMin: metadata["show.rating.ratingScaleMinValue"],
    ratingValue: metadata["show.rating.ratingValue"],
    ratingNotes: metadata["show.rating.notes"],
  };

  //not used yet:
  /*   
  publicationEvent1: {
    publicationDate: "14.03.2024",
    publicationTime: "14:33",
    publicationChannel: metadata["dates.publicationHistory.repeatChannel"],
  }, 
  */
  let publicationHistory = {
    publicationEvent: {
      publicationDate:
        metadata["dates.publicationHistory.firstPublicationDate"],
      publicationTime:
        metadata["dates.publicationHistory.firstPublicationTime"],
      publicationChannel: metadata["show.videoLinks"],
    },
  };

  let part = [
    {
      description: [
        {
          description: "",
        },
        {
          description: "",
        },
      ],
      format: [
        {
          locator: "",
        },
        {
          start: {
            editUnitNumber: "",
          },
        },
      ],
      language: {
        language: "",
      },
    },
  ];

  const coreMetadataTemplate = {
    title: {
      title: metadata["show.title.title"],
    },
    titleNote: {
      title: metadata["show.title.titleNote"],
    },
    descriptiveTitle: {
      title: metadata["show.title.descriptiveTitle"],
    },
    descriptiveTitleNote: {
      title: metadata["show.title.descriptiveTitleNote"],
    },
    alternativeTitle: {
      title: metadata["show.title.alternativeTitle"],
    },
    alternativeTitleNote: {
      title: metadata["show.title.alternativeTitleNote"],
    },
    shortcode: shortcode,
    creator: creator,
    contributor: contributors,
    subject: subject,
    description: {
      description: metadata["show.description.text"],
    },
    tags: tags,
    oldTags: oldTags,
    type: type,
    language: {
      language: metadata["show.language"],
    },
    version: metadata["show.version"],
    publisher: publisher,
    date: dates,
    format: formatCoreMetadata,
    coverage: coverage,
    archiveData: [
      {
        fileSize: metadata["archiveData.filesize"],
        locator: metadata["archiveData.archiveFilePath"],
        locatorArchive: metadata["archiveData.archiveLocation"],
        fileName: metadata["archiveData.filename"],
      },
    ],
    rights: rigthsTemplate,
    rating: rating,
    publicationHistory: publicationHistory,
    part: part,
  };

  return coreMetadataTemplate;
}

function getMetadataProviderTemplate(metadata) {
  return {
    organisationDetails: {
      organisationName: "FS1",
      organisationDepartment: "",
      details: {
        emailAddress: "",
        webAddress: "fs1.tv",
        address: {
          addressLine: "Bergstrasse 12",
          addressTownCity: "Salzburg",
          addressCountyState: "Salzburg",
          addressDeliveryCode: "5020",
          country: "Austria",
        },
      },
      contacts: {
        contactDetails: {
          name: "Stella Patzlaff",
          username: "s.patzlaff",
          occupation: "IT",
          details: {
            emailAddress: "s.patzlaff@fs1.tv",
            webAddress: "fs1.tv",
            telephoneNumber: "+1234567890",
          },
        },
        role: "",
      },
    },
  };
}

function getFormatTemplate(metadata) {
  //TODO: what should happend with:
  let codecID = undefined;

  let id = undefined;
  let format = undefined;
  let encodedLibraryName = undefined;
  let encodedLibraryVersion = undefined;
  let defaultFlag = undefined;
  let forcedFlag = undefined;

  let videoFormatTemplate = [
    {
      "@videoFormatName": "format",
      "ebucore:width": [
        {
          "@unit": metadata["mediainfo.video.__0__.widthUnit"],
          "#value": `${metadata["mediainfo.video.__0__.width"]}`,
        },
      ],
      "ebucore:height": [
        {
          "@unit": metadata["mediainfo.video.__0__.heightUnit"],
          "#value": `${metadata["mediainfo.video.__0__.height"]}`,
        },
      ],
      "ebucore:frameRate": [
        {
          "#value": `${metadata["mediainfo.video.__0__.frameRateBase"]}`,
        },
      ],
      "ebucore:aspectRatio": [
        {
          "@typeLabel": metadata["mediainfo.video.__0__.aspectRatioType"],
          "ebucore:factorNumerator": [
            {
              "#value": `${metadata["mediainfo.video.__0__.displayAspectRatioNum"]}`,
            },
          ],
          "ebucore:factorDenominator": [
            {
              "#value": `${metadata["mediainfo.video.__0__.displayAspectRatioDen"]}`,
            },
          ],
        },
      ],
      "ebucore:videoEncoding": [
        {
          "@typeLabel": metadata["mediainfo.video.__0__.encoding"],
        },
      ],
      "ebucore:codec": [
        {
          "ebucore:codecIdentifier": [
            {
              "dc:identifier": [
                {
                  "#value": metadata["mediainfo.video.__0__.codecID"],
                },
              ],
            },
          ],
        },
      ],
      "ebucore:bitRate": [
        {
          "#value": metadata["mediainfo.video.__0__.bitRate"],
        },
      ],
      "ebucore:scanningFormat": [
        {
          "#value": metadata["mediainfo.video.__0__.scanType"],
        },
      ],
      "ebucore:videoTrack": [
        {
          "@trackId": metadata["mediainfo.video.__0__.id"],
        },
      ],
      "ebucore:technicalAttributeString": [
        {
          "@typeLabel": "ColorSpace",
          "#value": metadata["mediainfo.video.__0__.colorSpace"],
        },
        {
          "@typeLabel": "ChromaSubsampling",
          "#value": metadata["mediainfo.video.__0__.chromaSubsampling"],
        },
        {
          "@typeLabel": "GOP",
          "#value": metadata["mediainfo.video.__0__.formatSettingsGOP"],
        },
        ...(metadata["mediainfo.video.__0__.colorPrimaries"]
          ? [
              {
                "@typeLabel": "colour_primaries",
                "#value": metadata["mediainfo.video.__0__.colorPrimaries"],
              },
            ]
          : []),
        ...(metadata["mediainfo.video.__0__.transferCharacteristics"]
          ? [
              {
                "@typeLabel": "transfer_characteristics",
                "#value":
                  metadata["mediainfo.video.__0__.transferCharacteristics"],
              },
            ]
          : []),
        ...(metadata["mediainfo.video.__0__.matrixCoefficients"]
          ? [
              {
                "@typeLabel": "matrix_coefficients",
                "#value": metadata["mediainfo.video.__0__.matrixCoefficients"],
              },
            ]
          : []),
        ...(metadata["mediainfo.video.__0__.colorRange"]
          ? [
              {
                "@typeLabel": "colour_range",
                "#value": metadata["mediainfo.video.__0__.colorRange"],
              },
            ]
          : []),
        {
          "@typeLabel": "WritingLibrary",
          "#value": `${encodedLibraryName} ${encodedLibraryVersion}` /* ??? */,
        },
        {
          "@typeLabel": "Default",
          "#value": defaultFlag ? "Yes" : "No" /* ??? No oder true / false? */,
        },
        {
          "@typeLabel": "Forced",
          "#value": forcedFlag ? "Yes" : "No" /* ??? No oder true / false? */,
        },
      ],
      "ebucore:technicalAttributeInteger": [
        {
          "@typeLabel": "BitDepth",
          "@unit": metadata["mediainfo.video.__0__.bitDepthUnit"],
          "#value": metadata["mediainfo.video.__0__.bitDepth"],
        },
        {
          "@typeLabel": "StreamSize",
          "@unit": metadata["mediainfo.video.__0__.streamSizeUnit"],
          "#value": metadata["mediainfo.video.__0__.streamSize"],
        },
      ],
      "ebucore:technicalAttributeBoolean": [
        {
          "@typeLabel": "CABAC",
          "#value": metadata["mediainfo.video.__0__.formatSettingsCABAC"],
        },
        {
          "@typeLabel": "MBAFF",
          "#value": "false" /* ingore */,
        },
      ],
    },
  ];

  let audioFormatTemplate = [
    {
      "@audioFormatName": metadata["mediainfo.audio.__0__.format"],
      "ebucore:audioEncoding": [
        //TODO: check can be empty
        {
          "@typeLabel": `${metadata["mediainfo.audio.__0__.encoding"]}`,
          ...(metadata["mediainfo.audio.__0__.encodingUrl"]
            ? { "@typeLink": metadata["mediainfo.audio.__0__.encodingUrl"] }
            : {}), //URL: https://stackoverflow.com/a/54150674/9921564
        },
      ],
      "ebucore:codec": [
        {
          "ebucore:codecIdentifier": [
            {
              "dc:identifier": [
                {
                  "#value": metadata["mediainfo.audio.__0__.codecID"],
                },
              ],
            },
          ],
        },
      ],
      "ebucore:samplingRate": [
        {
          "#value": metadata["mediainfo.audio.__0__.samplingRate"],
        },
      ],
      "ebucore:bitRate": [
        {
          "#value": metadata["mediainfo.audio.__0__.bitRate"],
        },
      ],
      "ebucore:bitRateMax": [
        {
          "#value": metadata["mediainfo.audio.__0__.bitRateMaximum"],
        },
      ],
      "ebucore:bitRateMode": [
        {
          "#value":
            metadata["mediainfo.audio.__0__.bitRateMode"] == "CBR"
              ? "constant"
              : "variable",
        },
      ],
      "ebucore:audioTrack": [
        {
          "@trackId": metadata["mediainfo.audio.__0__.id"],
          "@trackLanguage": metadata["mediainfo.audio.__0__.languageCode"],
        },
      ],
      "ebucore:channels": [
        {
          "#value": metadata["mediainfo.audio.__0__.channels"],
        },
      ],

      "ebucore:technicalAttributeString": [
        {
          "@typeLabel": "ChannelPositions",
          "#value": metadata["mediainfo.audio.__0__.channelPositions"],
        },
        {
          "@typeLabel": "ChannelLayout",
          "#value": metadata["mediainfo.audio.__0__.channelLayout"],
        },
        {
          "@typeLabel": "Endianness",
          "#value": metadata["mediainfo.audio.__0__.formatSettingsEndianness"],
        },
      ],
      "ebucore:technicalAttributeInteger": [
        {
          "@typeLabel": "StreamSize",
          "@unit": metadata["mediainfo.audio.__0__.streamSizeUnit"],
          "#value": metadata["mediainfo.audio.__0__.streamSize"],
        },
      ],
    },
  ];

  let containerTemplate = [
    {
      "@containerFormatName": metadata["mediainfo.info.containerFormatName"],
      "ebucore:containerEncoding": [
        {
          "@formatLabel": metadata["mediainfo.info.containerEncoding"],
        },
      ],
      "ebucore:codec": [
        {
          "ebucore:codecIdentifier": [
            {
              "dc:identifier": [
                {
                  "#value": metadata["mediainfo.info.codecID"],
                },
              ],
            },
          ],
        },
      ],
      "ebucore:technicalAttributeString": [
        {
          "@typeLabel": "FormatProfile",
          "#value": metadata["mediainfo.info.formatProfile"],
        },
      ],
    },
  ];

  return [
    {
      "ebucore:videoFormat": videoFormatTemplate,
      "ebucore:audioFormat": audioFormatTemplate,
      "ebucore:containerFormat": containerTemplate,
      "ebucore:duration": [
        {
          "ebucore:normalPlayTime": [
            {
              "#value": metadata["mediainfo.info.durationEBUCore"],
            },
          ],
        },
      ],
      "ebucore:fileSize": [
        {
          "#value": `{${metadata["mediainfo.info.fileSize"]}`,
        },
      ],
      "ebucore:fileName": [
        {
          "#value": metadata["archiveData.filename"],
        },
      ],
      "ebucore:locator": [
        {
          "#value": metadata["archiveData.archiveFilePath"],
        },
      ],
      "ebucore:technicalAttributeInteger": [
        {
          "@typeLabel": "OverallBitRate",
          "@unit": metadata["mediainfo.info.overallBitRateUnit"],
          "#value": metadata["mediainfo.info.overallBitRateMode"],
        },
      ],
      "ebucore:dateCreated": [
        {
          "@startDate": metadata["mediainfo.info.dateCreatedDate"],
          "@startTime": metadata["mediainfo.info.dateCreatedTime"],
        },
      ],
      "ebucore:dateModified": [
        {
          "@startDate": metadata["mediainfo.info.dateCreatedDate"],
          "@startTime": "00:00",
        },
      ],
    },
  ];
}

module.exports = {
  getMetadataFilledInSidecarfile,
};
