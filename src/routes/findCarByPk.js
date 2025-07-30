const { Car } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/cars/:id", async (req, res) => {
    try {
      const id = req.params.id;

      const car = await Car.findByPk(id);
      res.status(200).json({
        message: `Informations de la voiture ${car.brand} ${car.name} :`,
        data: car,
      });
    } catch (error) {
      let status = car === undefined ? 404 : 500;
      res.status(status).json({
        message: "Récupération de la voiture échouée: ",
        data: error,
      });
    }
  });
};
