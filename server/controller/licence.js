const initLicenceController = (router, videoLicenceManager) => {
  router.get("/licence/", async (req, res) => {
      try {
        var storedData = videoLicenceManager.getConstants();

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

    //not in use
    router.get("/licence/:id", async (req, res) => {
      var licenceId = req.params.id;
      try {
        var storedData = videoLicenceManager.getConstantValue(licenceId);

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
}

module.exports = {
  initLicenceController
};
