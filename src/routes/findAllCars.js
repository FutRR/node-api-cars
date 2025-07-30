const { Car } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/cars", async (req, res) => {
    try {
      const cars = await Car.findAll();
      res.json({ message: "Liste des voitures", data: cars });
    } catch (error) {
      res.status(500).json({
        message: "Récupération de la liste des voitures échouée: ",
        data: error,
      });
    }
  });
};
