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

        console.log("body.pluginData which should be stored:", body.pluginData);

        storageManager.storeData("metadata-" + video.id, unflattenJSON(body.pluginData));
      }
    });

    // Add your custom value to the video, so the client autofill your field using the previously stored value
    registerHook({
      target: "filter:api.video.get.result",
      handler: async (video) => {
        if (!video) return video;
        console.log("result video id", video.id);


        if (!video.pluginData) video.pluginData = {};
        var storedData = await storageManager.getData(
          "metadata-" + video.id
        );

        var flattedData = flattenJSON(storedData)
        
        video.pluginData = flattedData;

        console.log("result video.pluginData:", video.pluginData);
        return video;
      },
    });
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
