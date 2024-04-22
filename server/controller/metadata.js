const initMetadataController = (router, syncedMetadataDAO) => {
  router.get("/metadata/:id", async (req, res) => {
    try {
      var videoId = req.params.id;
      if (videoId) {
        var metadata = await syncedMetadataDAO.findSyncedMetadata(
          undefined,
          videoId
        );

        if (metadata == null || metadata == undefined) {
          res.status(404).json({ error: "Not Found: Resource not available" });
          return;
        }
        console.log("metadata", metadata[0][0]);

        res.setHeader("Access-Control-Allow-Origin", "*");

        res.send(metadata[0][0].metadata);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
};

module.exports = {
  initMetadataController,
};
