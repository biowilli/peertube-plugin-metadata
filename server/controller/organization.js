const { v4: uuidv4 } = require('uuid');

const initOrganizationController = (router, storageManager) => {
  router.get("/organization/all", async (req, res) => {
      try {
        var storedData = await storageManager.getData("organization");
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

  router.post("/organization/create", async (req, res) => {
    try {
      var existingOrganization = await storageManager.getData("organization");
      var organizationname = await req.body.name;
      var newData = {
        id: uuidv4(),
        name: organizationname,
      };
      if (existingOrganization == undefined) {
        await storageManager.storeData("organization", {
          data: [newData],
        });

        res.send(newData);
        return;
      }

      existingOrganization.data.push(newData);
      await storageManager.storeData("organization", existingOrganization);

      res.send(newData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.delete("/organization/delete/:id", async (req, res) => {
    try {
      var existingOrganization = await storageManager.getData("organization");
      var organizationId = req.params.id;

      if (existingOrganization == undefined) {
        res
          .status(404)
          .json({ success: false, message: "Organization nicht gefunden." });
        return;
      }

      var organizationIndex = existingOrganization.data.findIndex((org) => org.id == organizationId);
      if (organizationIndex !== -1) {
        existingOrganization.data.splice(organizationIndex, 1);
        await storageManager.storeData("organization", existingOrganization);
        res.status(200).json({
          success: true,
          message: "Organization erfolgreich gelöscht.",
        });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Organization nicht gefunden." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
}

module.exports = {
  initOrganizationController,
};
