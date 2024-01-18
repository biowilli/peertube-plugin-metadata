const initVideoResultHooks = (
  registerHook,
  storageManager,
  creatorDAO,
  organizationDAO
) => {
  registerHook({
    target: "filter:api.video.get.result",
    handler: async (video) => {
      if (!video) return video;
      if (!video.pluginData) video.pluginData = {};

      //TODO: use DAOs for everything
      var storedData = await storageManager.getData(
        "metadata-" + video.dataValues.id + "-" + 0
      );

      if (storedData === null || undefined) {
        return video;
      }

      //TODO: prepare here  creatorDAO,organizationDAO
      video.pluginData = storedData;

      return video;
    },
  });
};

module.exports = {
  initVideoResultHooks,
};
