const { Car } = require("../db/sequelize");
const { sendError } = require("../helpers/helper");

module.exports = (app) => {
  app.delete("/api/cars/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const car = await Car.findByPk(id);

      if (car === null) {
        return sendError(res, 404, "Voiture introuvable");
      }

      const deletedCar = car;

      await Car.destroy({ where: { id: car.id } });
      res.status(200).json({
        message: `La voiture ${deletedCar.brand} ${deletedCar.name} a bien été supprimée`,
      });
    } catch (error) {
      return sendError(res, 500, "Suppression de la voiture échouée: ", error);
    }
  });
};
