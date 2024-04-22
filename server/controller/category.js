const initCategoryController = (router, videoCategoryManager) => {
  router.get("/category/", async (req, res) => {
    try {
      var storedData = videoCategoryManager.getConstants();
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
  initCategoryController,
};
