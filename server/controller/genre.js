const { v4: uuidv4 } = require('uuid');

const initGenreController = (router, storageManager) => {
  router.get("/genre/all", async (req, res) => {
      try {
        var storedData = await storageManager.getData("genre");
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

  router.post("/genre/create", async (req, res) => {
    try {
      var existingGenre = await storageManager.getData("genre");
      var genrename = await req.body.name;
      var newData = {
        id: uuidv4(),
        name: genrename,
      };
      if (existingGenre == undefined) {
        await storageManager.storeData("genre", {
          data: [newData],
        });

        res.send(newData);
        return;
      }

      existingGenre.data.push(newData);
      await storageManager.storeData("genre", existingGenre);

      res.send(newData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.delete("/genre/delete/:id", async (req, res) => {
    try {
      var existingGenre = await storageManager.getData("genre");
      var genreId = req.params.id;

      if (existingGenre == undefined) {
        res
          .status(404)
          .json({ success: false, message: "Genre nicht gefunden." });
        return;
      }

      var genreIndex = existingGenre.data.findIndex((org) => org.id == genreId);
      if (genreIndex !== -1) {
        existingGenre.data.splice(genreIndex, 1);
        await storageManager.storeData("genre", existingGenre);
        res.status(200).json({
          success: true,
          message: "Genre erfolgreich gelöscht.",
        });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Genre nicht gefunden." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
}

module.exports = {
  initGenreController
};
