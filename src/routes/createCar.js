const { Car } = require("../db/sequelize");
const { sendError } = require("../helpers/helper");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.post("/api/cars", async (req, res) => {
    try {
      const createdCar = await Car.create(req.body);

      res.status(201).json({
        message: `La voiture ${createdCar.brand} ${createdCar.name} a bien été créée :`,
        data: createdCar,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, "Erreur de validation", error);
      }
      if (error instanceof UniqueConstraintError) {
        return sendError(res, 400, "Le modèle doit être unique", error);
      }
      return sendError(
        res,
        500,
        "Erreur lors de la création d'une nouvelle voiture :",
        error
      );
    }
  });
};
