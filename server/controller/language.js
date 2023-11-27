const initLanguageController = (router, videoLanguageManager) => {
  router.get("/language/", async (req, res) => {
      try {
        var storedData = videoLanguageManager.getConstants();

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
    router.get("/language/:id", async (req, res) => {
      var languageId = req.params.id;
      try {
        var storedData = videoLanguageManager.getConstantValue(languageId);

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
  initLanguageController
};
