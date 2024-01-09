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
      console.log("storedData");
      if (storedData === null || undefined) {
        return video;
      }
      console.log(storedData);

      result = {};
      for (let key in storedData) {
        console.log(key);
        if (key == "creator") {
          var existingCreators = await creatorDAO.getAllCreators();
          if (existingCreators === null || existingCreators === undefined) {
            continue;
          }
          storedData[key].map(async (id) => {
            var creator = existingCreators.filter(
              (creator) => creator.id === id
            );
            if (creator.length > 0) {
              var creatorKey =
                "creator-" + creator[0].id + "-" + creator[0].name;
              result[creatorKey] = "true";
            }
          });
          continue;
        }

        if (key == "contributor") {
          var existingContributors = await creatorDAO.getAllCreators();
          if (
            existingContributors === null ||
            existingContributors === undefined
          ) {
            continue;
          }
          storedData[key].map(async (id) => {
            var contributor = existingContributors.filter(
              (contributor) => contributor.id === id
            );
            if (contributor.length > 0) {
              var contributorKey =
                "contributor-" + contributor[0].id + "-" + contributor[0].name;
              result[contributorKey] = "true";
            }
          });
          continue;
        }

        if (key == "organization") {
          var existingOrganizations =
            await organizationDAO.getAllOrganizations();
          console.log("existingOrganizations:", existingOrganizations);
          if (
            existingOrganizations === null ||
            existingOrganizations === undefined
          ) {
            continue;
          }
          storedData[key].map(async (id) => {
            var organization = existingOrganizations.filter(
              (organization) => organization.id === id
            );
            if (organization.length > 0) {
              var organizationKey =
                "organization-" +
                organization[0].id +
                "-" +
                organization[0].name;
              console.log(organizationKey);
              result[organizationKey] = "true";
            }
          });
          continue;
        }

        result[key] = storedData[key] || "";
      }
      video.pluginData = result;

      return video;
    },
  });
};

module.exports = {
  initVideoResultHooks,
};
