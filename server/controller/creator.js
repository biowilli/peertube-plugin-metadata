const { v4: uuidv4 } = require("uuid");

const initCreatorController = (router, storageManager) => {
  router.get("/creator/", async (req, res) => {
    try {
      var storedData = await storageManager.getData("creator");
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

  router.post("/creator/", async (req, res) => {
    try {
      var existingCreator = await storageManager.getData("creator");

      const name = await req.body.name;
      const familyname = await req.body.familyname;
      const username = await req.body.username;
      const occupation = await req.body.occupation;
      const email = await req.body.email;
      const url = await req.body.url;
      const address = await req.body.address;
      const city = await req.body.city;
      const state = await req.body.state;
      const country = await req.body.country;
      const deliverycode = await req.body.deliverycode;
      const telephone = await req.body.telephone;
      const mobile = await req.body.mobile;
      const stage = await req.body.stage;
      const contacts = await req.body.contacts;
      const role = await req.body.role;
      //required
      if (!username) {
        res.status(400).send("The 'username' field must be set.");
        return;
      }

      var newData = {
        id: uuidv4(),
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

      if (existingCreator == undefined) {
        await storageManager.storeData("creator", {
          data: [newData],
        });

        res.send(newData);
        return;
      }

      existingCreator.data.push(newData);
      await storageManager.storeData("creator", existingCreator);

      res.send(newData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.delete("/creator/:id", async (req, res) => {
    try {
      var existingCreator = await storageManager.getData("creator");
      var creatorId = req.params.id;

      if (existingCreator == undefined) {
        res
          .status(404)
          .json({ success: false, message: "Creator nicht gefunden." });
        return;
      }

      var creatorIndex = existingCreator.data.findIndex(
        (org) => org.id == creatorId
      );
      if (creatorIndex !== -1) {
        existingCreator.data.splice(creatorIndex, 1);
        await storageManager.storeData("creator", existingCreator);
        res.status(200).json({
          success: true,
          message: "Creator erfolgreich gelöscht.",
        });
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
};

module.exports = {
  initCreatorController,
};
