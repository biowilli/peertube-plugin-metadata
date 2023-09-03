async function register({
  registerHook,
  storageManager,
  getRouter,
  registerSetting
}) {
    const { initRegisterSettings }  = require("./server/settings.js");
    const { initCreatorController }  = require("./server/controller/creator.js");
    const { initGenreController } = require("./server/controller/genre.js");
    const { initOrganizationController }  = require("./server/controller/organization.js");
    initRegisterSettings(registerSetting);

    var router = getRouter();
    initCreatorController(router, storageManager);
    initGenreController(router, storageManager);
    initOrganizationController(router, storageManager);

    // Store data associated to this video
    registerHook({
      target: "action:api.video.updated",
      handler: ({ video, body }) => {
        if (!body.pluginData) return;
        storageManager.storeData("metadata-" + video.id, unflattenJSON(body.pluginData));
      }
    });

    // Add your custom value to the video, so the client autofill your field using the previously stored value
    registerHook({
      target: "filter:api.video.get.result",
      handler: async (video) => {
        if (!video) return video;
        console.log("console.log(video2);");
        console.log(video);
        
        if (!video.pluginData) video.pluginData = {};
        var storedData = await storageManager.getData(
          "metadata-" + video.id
        );

        var flattedData = flattenJSON(storedData)
        
        video.pluginData = flattedData;
        
        return video;
      },
    });
  }

function getNestedArray(data) {
  // Konvertiere das Objekt in ein JSON-Format
  const json = JSON.stringify(data);
  console.log(json);
  //TODO Notes and publicationHistory mal weggelassen

  //TODO add note and descriptive title
  title = {
    title: data.title,
    alternativeTitle: data.alternativeTitle,
    descriptiveTitle: data.descriptiveTitle,
  };

  //TODO check again which data types have to be added

  const sortedKeys = filterKeysByPrefixAndValue(data);
  console.log('User keys:', sortedKeys.userKeys);
  console.log('Contributor keys:', sortedKeys.contributorKeys);
  console.log('Organization keys:', sortedKeys.organizationKeys);

  var tagResult = [];
  var tagResult = data.tags.split(",").map(function(tag) {
    return tag.trim();
  });
  
  description = {
    tags: tagResult,
    subject: data.subject,
    text: data.text,
  };

  var dateModified = new Date();
  dates = {
      coverage: {
        dateRecorded: data.dateRecorded,
        recordingLocation: [],
      },
      issued: {
        firstIssued: data.firstIssued,
        lastIssued: data.lastIssued,
      },
      dateDigitalied: data.dateDigitalied,
      videoLinks: data.videoLinks,
      dateModified: dateModified,
      archiveData: {
        filesize: "selbst rauskriegen",
        filename: data.filename
      }
  };

  videoInformation = {
    genre: data.genre,
    targetGroup: data.targetGroup,
    showType: {
      series: data.series,
      type: data.type
    },
    parts: data.parts,
    version: data.version,
    category: "channelNamen",
    rating: {
      ratingValue: data.rating,
      ratingScaleMaxValue: "idk",
      ratingScaleMinValue: "idk",
      notes: data.notes
    }
};
  //TODO Rights ???
  rights = {
    
  };
  //TODO Metadata provider ??
  metadDataProvider = {
    organisation: "",
    organizationDepartment: "",
    role: "",
    user: "",
  };
  //TODO Technical data
  technicalData = {
    videoFormat: {
      videoFormatID: "idk",
      videoFormatName: "idk",
      videoFormatDefinition: "idk",
      regioDelimX: "idk",
      regioDelimY: "idk",
      aspectRatio: "idk",
      width: "idk in px",
      height: "idk in px",
      videoEncoding: "idk",
      videoTrack: {
        id: "",
        name: ""
      } 
    },
    audioFormat: {
      audioFormatID: "idk",
      audioFormatName: "idk",
      audioFormatDefinition: "idk",
      audioEncoding: "idk",
      audioConfiguration: "idk",
      audioTrack: {
        id: "",
        name: "",
        language: "",
      },
    },  
    imageFormat: {
      imageFormatID: "idk",
      imageFormatName: "idk",
      imageFormatDefinition: "idk",
      regioDelimX: "idk",
      regioDelimY: "idk",
      width: "idk in px",
      height: "idk in px",
      orientation: "",
      imageEncoding: "idk",
    },
    signingFormat: {
      trackID: "idk",
      trackName: "idk",
      language: "idk",
      signingSourceURI: "idk",
      signingFormatID: "idk",
      signingFormatName: "idk",
      signingFomratDefinition: "idk",
    }, 
    containerFormat:  "idk",
    dataFormat: "idk ... noch viel mehr...",
    duration: {
      start: "",
      end: "",
      duration: "",
    },
    filesize: "",
    filename: "",
    locator: "idk",
    documentFormat: "idk ... noch viel mehr...",
    medium: "",
    mimeType: "",
  }

  transformedData = {
    title: title,
    creator: creatorResult,
    contributor: contributorResult,
    publisher: organizationResult,
    description: description,
    dates: dates,
    videoInformation: videoInformation,
    rights: rights,
    metadDataProvider: metadDataProvider, 
    technicalData: technicalData,
  };

  console.log("v5_transformedData");
  console.log(transformedData);
  console.log("v5_flattedData");
  console.log(flattenJSON(transformedData));

  return transformedData;
}

function filterKeysByPrefixAndValue(obj) {
  let userKeys = [];
  let organizationKeys = [];
  let contributorKeys = [];

  for (const key in obj) {
    if (obj[key] === 'true') {
      if (key.startsWith('user')) {
        userKeys.push(key);
      } else if (key.startsWith('contributor')) {
        contributorKeys.push(key);
      } else if (key.startsWith('organization')) {
        organizationKeys.push(key);
      } 
    }
  }

  return { userKeys, contributorKeys, organizationKeys };
}


// Umwandlung in eindimensionales JSON
function flattenJSON(obj, prefix = '') {
  let result = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        let flattenedObj = flattenJSON(obj[key], newKey);
        result = { ...result, ...flattenedObj };
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  console.log("result flattenJSON in flattenJSON", result);
  return result;
}

// Umwandlung in nested JSON
function unflattenJSON(flatJson) {
  console.log("flattenJSON in unflattenJSON", flatJson);
  const nestedJson = {};

  for (const key in flatJson) {
    if (key.includes(".")) {
      const nestedKeys = key.split(".");
      let currentNestedJson = nestedJson;

      for (let i = 0; i < nestedKeys.length - 1; i++) {
        const nestedKey = nestedKeys[i];

        if (!currentNestedJson[nestedKey]) {
          currentNestedJson[nestedKey] = {};
        }

        currentNestedJson = currentNestedJson[nestedKey];
      }

      currentNestedJson[nestedKeys[nestedKeys.length - 1]] =
        flatJson[key] !== undefined ? flatJson[key] : "";
    } else {
      nestedJson[key] = flatJson[key] !== undefined ? flatJson[key] : "";
    }
  }
  console.log("result flattenJSON in unflattenJSON", nestedJson);
  return nestedJson;
}

module.exports = {
  register,
  unregister,
};

async function unregister() {
  return;
}
