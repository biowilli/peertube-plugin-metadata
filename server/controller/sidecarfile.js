const {
  getMetadataFilledInSidecarfile,
} = require("./../templates/sidecartemplate.js");
const initSidecarfileController = (
  router,
  syncedMetadataDAO,
  creatorDAO,
  organizationDAO,
  videoLicenceManager
) => {
  router.get("/sidecarfile/:id", async (req, res) => {
    try {
      var videoId = req.params.id;
      var syncedMetadata = await syncedMetadataDAO.findSyncedMetadata(
        videoId,
        undefined
      );

      var result = await getMetadataFilledInSidecarfile(
        syncedMetadata[0][0].metadata,
        creatorDAO,
        organizationDAO,
        videoLicenceManager
      );

      if (result == null) {
        res.send({});
        return;
      }
      var filename = videoId + "sidecarfile.json";
      var formattedJSON = JSON.stringify(result, null, 2);
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      res.setHeader("Content-Type", "application/json");

      res.send(formattedJSON);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = {
  initSidecarfileController,
};
