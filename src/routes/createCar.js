const { Car } = require("../db/sequelize");
const { sendError } = require("../helpers/helper");

module.exports = (app) => {
  app.post("/api/cars", async (req, res) => {
    try {
      const createdCar = await Car.create(req.body);

      res.status(201).json({
        message: `La voiture ${createdCar.brand} ${createdCar.name} a bien été créée :`,
        data: createdCar,
      });
    } catch (error) {
      return sendError(
        res,
        500,
        "Erreur lors de la création d'une nouvelle voiture :",
        error
      );
    }
  });
};
