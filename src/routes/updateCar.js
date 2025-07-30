const { Car } = require("../db/sequelize");

module.exports = (app) => {
  app.put("/api/cars/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await Car.update(req.body, { where: { id: id } });
      const updatedCar = await Car.findByPk(id);

      if (!updatedCar) {
        return res.status(404).json({
          message: "Voiture non trouvée",
        });
      }

      res.status(200).json({
        message: `La voiture ${updatedCar.brand} ${updatedCar.name} a bien été modifiée`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création d'une nouvelle voiture :",
        data: error,
      });
    }
  });
};
