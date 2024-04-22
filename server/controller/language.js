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
};

module.exports = {
  initLanguageController,
};
