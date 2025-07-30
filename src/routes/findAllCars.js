const { Car } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/cars", async (req, res) => {
    try {
      const cars = await Car.findAll();
      res.json({ message: "Liste des voitures", data: cars });
    } catch (error) {
      return sendError(
        res,
        500,
        "Récupération de la liste des voitures échouée: ",
        error
      );
    }
  });
};
