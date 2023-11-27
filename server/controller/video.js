const { v4: uuidv4 } = require('uuid');

const initVideoController = (router, storageManager, host) => {
  router.get("/videos/all", async (req, res) => {
      fetch(`${host}/api/v1/videos`)
        .then(response => {
          if (!response.ok) {
            throw console.error('Fehler beim Abrufen der Videoinformationen');
          }
          return response.json();
        })
        .then(async data => {
          const videos = data.data;
          const total = data.total;

          var videoIds = [];
          for (let i = 0; i < total; i++) {
            videoIds.push(videos[i].id);
          }
      
          console.log("videoIds", videoIds);

          const videoData = {};

          for (const videoId of videoIds) {
            console.log("current processed videoId:", videoId);
            var metaDataObjects = await getMetdataVersions(videoId, storageManager);

            if (metaDataObjects != null){
              videoData[videoId] = metaDataObjects;
            }
          }

          console.log("videoData object:", videoData);

          if (videoData == null) {
            res.send({});
            return;
          }
          res.send(videoData);
          return;
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Videoinformationen:', error);
        });

  });

  // latestVersion metadata
  router.get("/video/:id", async (req, res) => {
    var videoId = req.params.id;

    const latestVersion = await getLatestVersion(videoId, storageManager);
    console.log("latestVersion of metadata", latestVersion)
    if (!latestVersion) {
      res.json({value: undefined});
    } else {
      res.json({value: latestVersion});
    }
});

  router.post("/video/:id/version", async (req, res) => {
    const videoId = req.params.id;
    const version = req.body.value;
    try {
      console.log("Kommte es hier AnalyserNode", videoId, version)
      await setVideoVersion(videoId, version, storageManager);
      res.json({ message: "Version metadata updated successfully" });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
  });

  router.get("/video/:id/version", async (req, res) => {
    const videoId = req.params.id;
    var version = await getVideoVersion(videoId, storageManager);

    if (version !== null) {
      console.log("Welche Version wurde abgerufen:", version);
      res.json(version);
    } else {
      res.json({ version: -1 });
    }
  });
};

async function setVideoVersion(videoId, version, storageManager) {
  console.log("setVideoVersion");
  const key = `version-metadata-${videoId}`;
  await storageManager.storeData(key, {version});
}

async function getVideoVersion(videoId, storageManager) {
  console.log("getVideoVersion");
  const key = `version-metadata-${videoId}`;
  return  await storageManager.getData(key);;
}

async function getMetdataVersions(videoId, storageManager){
  const versionsData = {};
  for (let version = 0; version < 100; version++) {
    console.log("version number:", version);

    const key = "metadata-" + videoId + "-" + version;
    const currentProcessedStoredData = await storageManager.getData(key);

    if (currentProcessedStoredData == null) {
      if (version == 0){
        return null;
      }

      return {
      totalVersions: version,
      ...versionsData,
    };}

    versionsData[version] = currentProcessedStoredData;
  }  
}

async function getLatestVersion(videoId, storageManager) {
  let latestVersion = -1;

  for (let version = 0; version < 10000; version++) {
    const key = `metadata-${videoId}-${version}`;
    const metadata = await storageManager.getData(key);

    if (metadata === null) {
      break;
    } else {
      latestVersion = version;
    }
  }

  if (latestVersion === -1) {
    return null;
  }

  return latestVersion
}

module.exports = {
  initVideoController,
};
