const initSidecarfileController = (router, storageManager) => {
  router.get("/sidecarfile", async (req, res) => {
    try {
      //TODO: create Sidecarfile and make downloadable

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
  initSidecarfileController,
};
