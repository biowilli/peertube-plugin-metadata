const initMetadataController = (router, storageManager, host) => {
  //API Entpunkt for WP Plugin
  router.get("/metadata/", async (req, res) => {
    console.log("/metadata/");
    console.log("body:", req.body);
    try {
      const videoId = await req.body.videoUuid;
      const videoUuid = await req.body.videoUuid;
      const version = await req.body.version;

      if (!version) {
        res.status(400).send("Bad Request: Missing version parameter");
        return;
      }

      if (videoId) {
        var storedData = await storageManager.getData(
          `metadata-${videoId}-${version}`
        );

        if (storedData == null) {
          res.status(404).json({ error: "Not Found: Resource not available" });
          return;
        }

        res.send(storedData);
        return;
      }

      fetch(`${host}/api/v1/videos/${videoUuid}`)
        .then((response) => {
          if (!response.ok) {
            console.error("Fehler beim Abrufen der Videoinformationen");
            return;
          }
          return response.json();
        })
        .then(async (data) => {
          const videoId = data.id;
          var storedData = await storageManager.getData(
            `metadata-${videoId}-${version}`
          );
          if (storedData == null) {
            res
              .status(404)
              .json({ error: "Not Found: Resource not available" });
            return;
          }

          res.send(storedData);
          return;
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post("/metadata/", async (req, res) => {
    const { EBUDefaults } = require("./../../model/EbuDefaults.js");
    console.log(EBUDefaults.values);

    try {
      const videoId = await req.body.videoId;
      const version = await req.body.version;

      const note = await req.body.note; //| `show.abbrev`| `title.note`|
      const daterecorded = await req.body.daterecorded; //| `production.date`| `dates.coverage.daterecorded`|
      const videoLinks = await req.body.videoLinks; //| `youtube.link` | `dates.videoLinks` |
      const firstPublicationDate = await req.body.firstPublicationDate; //| `Broadcast.date?``| `dates.publicationHistory.firstPublicationDate`|
      const filename = await req.body.filename; //| `file.name`| `dates.archiveData.filename`|
      const archiveLocation = await req.body.archiveLocation; //| `file.path`| `dates.archiveData.archiveLocation`|
      const info = await req.body.info; //| `info`| `videoInformation.info`|
      const duration = await req.body.duration; //| `duration.hhmmssss`| `technicaldata.duration`|
      const season = await req.body.season; //| `show.season` | `videoInformation.showType.season`|
      const episode = await req.body.episode; //| `show.issue`| `videoInformation.showType.episode`|
      const category = await req.body.category; //| `category`| `videoInformation.category` |
      const creator = await req.body.creator; //| `creator`| is List
      const contributor = await req.body.contributor; //| `contributor`| is List
      const organizations = await req.body.organizations; //| `organizations`| is List
      const title = await req.body.title; //| `show.name`| `title.title` |
      const descriptionTags = await req.body.descriptionTags; //| `tags`| `description.tags` |
      const descriptionText = await req.body.descriptionText; //| `show.description`| `description.text` |

      metadata["lastModifiedDate"] = new Date().toISOString();
      var metadata = EBUDefaults.values;

      metadata["title.note"] = note;
      metadata["dates.coverage.daterecorded"] = daterecorded;
      metadata["dates.videoLinks"] = videoLinks;
      metadata["dates.publicationHistory.firstPublicationDate"] =
        firstPublicationDate;
      metadata["dates.archiveData.filename"] = filename;
      metadata["dates.archiveData.archiveLocation"] = archiveLocation;
      metadata["videoInformation.info"] = info;
      metadata["technicaldata.duration"] = duration;
      metadata["videoInformation.showType.season"] = season;
      metadata["videoInformation.showType.episode"] = episode;
      metadata["videoInformation.category"] = category;
      metadata["creator"] = creator; //as Array
      metadata["contributor"] = contributor; //as Array
      metadata["organizations"] = organizations; //as Array
      metadata["title.title"] = title;
      metadata["description.tags"] = descriptionTags; //as Array
      metadata["description.text"] = descriptionText;
      var storedData = await storageManager.storeData(
        `metadata-${videoId}-${version}`,
        metadata
      );

      if (storedData == null) {
        res.send({});
        return;
      }
      res.send(storedData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = {
  initMetadataController,
};
