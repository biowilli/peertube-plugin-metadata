const { v4: uuidv4 } = require("uuid");

const initCreatorController = (router, storageManager) => {
  router.get("/creator/all", async (req, res) => {
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

  router.post("/creator/create", async (req, res) => {
    try {
      var existingCreator = await storageManager.getData("creator");
      const body = await req.body;
      console.log(body);
      const creatorname = await req.body.name;
      const creatorfamilyname = await req.body.familyname;
      const creatorusername = await req.body.username;
      const creatoroccupation = await req.body.occupation;
      const creatoremail = await req.body.email;
      const creatorurl = await req.body.url;
      const creatoraddress = await req.body.address;
      const creatorcity = await req.body.city;
      const creatorstate = await req.body.state;
      const creatorcountry = await req.body.country;
      const creatordeliverycode = await req.body.deliverycode;
      const creatortelephone = await req.body.telephone;
      const creatormobile = await req.body.mobile;
      const creatorstage = await req.body.creatorstage;
      const creatorcontacts = await req.body.contacts;
      const creatorrole = await req.body.role;

      var newData = {
        id: uuidv4(),
        creatorname: creatorname,
        creatorfamilyname: creatorfamilyname,
        creatorusername: creatorusername,
        creatoroccupation: creatoroccupation,
        creatoremail: creatoremail,
        creatorurl: creatorurl,
        creatoraddress: creatoraddress,
        creatordeliverycode: creatordeliverycode,
        creatorcity: creatorcity,
        creatorstate: creatorstate,
        creatorcountry: creatorcountry,
        creatortelephone: creatortelephone,
        creatormobile: creatormobile,
        creatorstage: creatorstage,
        creatorcontacts: creatorcontacts,
        creatorrole: creatorrole,
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

  router.delete("/creator/delete/:id", async (req, res) => {
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
