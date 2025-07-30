const { Car } = require("../db/sequelize");
const { sendError } = require("../helpers/helper");
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/cars/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await Car.update(req.body, { where: { id: id } });
      const updatedCar = await Car.findByPk(id);

      if (!updatedCar) {
        return sendError(res, 404, "Voiture non trouvée");
      }

      res.status(200).json({
        message: `La voiture ${updatedCar.brand} ${updatedCar.name} a bien été modifiée`,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, "Erreur de validation", error);
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
