const { Car } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/cars", async (req, res) => {
    try {
      const createdCar = await Car.create(req.body);

      res.status(201).json({
        message: `La voiture ${createdCar.brand} ${createdCar.name} a bien été créée :`,
        data: createdCar,
      });
    } catch (error) {
      // Check if it's a validation error
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          message: "Erreur de validation lors de la création :",
          data: error.errors,
        });
      }

      // Other errors (server errors)
      res.status(500).json({
        message: "Erreur lors de la création d'une nouvelle voiture :",
        data: error,
      });
    }
  });
};
