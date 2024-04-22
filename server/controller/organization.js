const initOrganizationController = (organizationDAO, router) => {
  router.get("/organization/", async (req, res) => {
    try {
      const allOrganizations = await organizationDAO.getAllOrganizations();
      res.send(allOrganizations);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/organization/:id", async (req, res) => {
    try {
      const organizationId = req.params.id;
      console.log(organizationId);
      const foundOrganization = await organizationDAO.findOrganization(
        organizationId
      );

      if (foundOrganization) {
        console.log("foundOrganization", foundOrganization);
        // TODO: Access-Control-Allow-Origin change?
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(foundOrganization);
      } else {
        res
          .status(404)
          .json({ success: false, message: "Organization not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/organization/", async (req, res) => {
    try {
      const { name, abbrev } = req.body;

      // required
      if (!name) {
        res.status(400).send("'name' field must be set.");
        return;
      }

      const newOrganization = {
        name: name,
        abbrev: abbrev,
      };

      const addedOrganization = await organizationDAO.addOrganization(
        newOrganization
      );
      res.send(addedOrganization);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.put("/organization/:id", async (req, res) => {
    try {
      const organizationId = req.params.id;
      const updatedData = req.body;
      const modifiedOrganization = await organizationDAO.modifyOrganization(
        organizationId,
        updatedData
      );
      res.send(modifiedOrganization);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.delete("/organization/:id", async (req, res) => {
    try {
      const organizationId = req.params.id;
      await organizationDAO.deleteOrganization(organizationId);
      res.status(200).json({
        success: true,
        message: "Organization deleted",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = {
  initOrganizationController,
};
