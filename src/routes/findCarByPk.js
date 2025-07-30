const { Car } = require("../db/sequelize");
const { sendError } = require("../helpers/helper");

module.exports = (app) => {
  app.get("/api/cars/:id", async (req, res) => {
    try {
      const id = req.params.id;

      const car = await Car.findByPk(id);

      if (car === null) {
        return sendError(res, 404, "Voiture introuvable");
      }

      res.status(200).json({
        message: `Informations de la voiture ${car.brand} ${car.name} :`,
        data: car,
      });
    } catch (error) {
      return sendError(res, 500, "Récupération de la voiture échouée: ", error);
    }
  });
};
