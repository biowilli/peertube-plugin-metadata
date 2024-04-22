const initMigrateController = (router, metadataDAO, syncedMetadataDAO) => {
  //TODO: delete after imported last files
  router.post("/migrate/mediainfo", async (req, res) => {
    try {
      console.log("Received POST request for /migrate/mediainfo");

      const videoId = req.body.videoId;
      const metadata = req.body.metadata;

      console.log("Video ID:", videoId);
      console.log("Metadata:", metadata);
      if (!videoId || !metadata) {
        console.log(
          "Error: Video ID or metadata is empty. Responding with a 400 error."
        );
        res.status(400).send("Bad Request");
        return;
      }
      console.log("addMetadata via endpoint");
      const result = await metadataDAO.addMetadata(
        JSON.stringify(metadata),
        videoId
      );

      if (!result) {
        console.log(
          "Error: Failed to store data. Responding with a 500 error."
        );
        res.status(500).send("Internal Server Error");
        return;
      }

      console.log("Sending response with stored data:", result);
      res.send(result);
    } catch (error) {
      console.error("Error processing /migrate/mediainfo:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/migrate/syncedMetadata", async (req, res) => {
    try {
      console.log("Received POST request for /migrate/syncedMetadata");

      const videoId = req.body.videoId;
      const metadata = req.body.metadata;

      console.log("Video ID:", videoId);
      et;
      console.log("Metadata:", metadata);

      if (!videoId || !metadata) {
        console.log(
          "Error: Video ID or metadata is empty. Responding with a 400 error."
        );
        res.status(400).send("Bad Request");
        return;
      }

      const result = await syncedMetadataDAO.addSyncedMetadata(
        JSON.stringify(metadata),
        videoId
      );

      if (!result) {
        console.log(
          "Error: Failed to store data. Responding with a 500 error."
        );
        res.status(500).send("Internal Server Error");
        return;
      }

      console.log("Sending response with stored data:", result);
      res.send(result);
    } catch (error) {
      console.error("Error processing /migrate/syncedMediainfo:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = {
  initMigrateController,
};
