const initCreatorController = (creatorDAO, router) => {
  router.get("/creator/", async (req, res) => {
    try {
      const allCreators = await creatorDAO.getAllCreators();
      res.send(allCreators);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/creator/:id", async (req, res) => {
    try {
      const creatorId = req.params.id;
      console.log("creatorId", creatorId);
      const foundCreator = await creatorDAO.findCreator(creatorId);
      console.log("foundCreator", foundCreator);
      if (foundCreator) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(foundCreator);
      } else {
        res
          .status(404)
          .json({ success: false, message: "Creator nicht gefunden." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/creator/", async (req, res) => {
    try {
      const {
        name,
        familyname,
        username,
        occupation,
        email,
        url,
        address,
        city,
        state,
        country,
        deliverycode,
        telephone,
        mobile,
        stage,
        contacts,
        role,
      } = req.body;

      // required
      if (!username) {
        res.status(400).send("The 'username' field must be set.");
        return;
      }

      const newCreator = {
        name: name,
        familyname: familyname,
        username: username,
        occupation: occupation,
        email: email,
        url: url,
        address: address,
        deliverycode: deliverycode,
        city: city,
        state: state,
        country: country,
        telephone: telephone,
        mobile: mobile,
        stage: stage,
        contacts: contacts,
        role: role,
      };

      const addedCreator = await creatorDAO.addCreator(newCreator);
      res.send(addedCreator);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.put("/creator/:id", async (req, res) => {
    try {
      const creatorId = req.params.id;
      const updatedData = await req.body;
      console.log("req", updatedData);
      const modifiedCreator = await creatorDAO.modifyCreator(
        creatorId,
        updatedData
      );
      res.send(modifiedCreator);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.delete("/creator/:id", async (req, res) => {
    try {
      const creatorId = req.params.id;
      await creatorDAO.deleteCreator(creatorId);
      res.status(200).json({
        success: true,
        message: "Creator erfolgreich gelöscht.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = {
  initCreatorController,
};
