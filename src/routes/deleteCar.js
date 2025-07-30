const { Car } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/cars/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const car = await Car.findByPk(id);

      if (!car) {
        return res.status(404).json({
          message: "Voiture non trouvée",
        });
      }

      const deletedCar = car;

      await Car.destroy({ where: { id: car.id } });
      res.status(200).json({
        message: `La voiture ${deletedCar.brand} ${deletedCar.name} a bien été supprimée`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Suppression de la voiture échouée: ", data: error });
    }
  });
};
