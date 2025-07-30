const { Op, where } = require("sequelize");
const { Car } = require("../db/sequelize");
const { sendError } = require("../helpers/helper");

module.exports = (app) => {
  app.get("/api/cars", async (req, res) => {
    try {
      if (req.query.name) {
        const name = req.query.name;
        if (name.length < 2) {
          return sendError(
            res,
            400,
            "La recherche doit contenir au moins 2 caractères",
            error
          );
        }
        const cars = await Car.findAll({
          where: { name: { [Op.like]: `%${name}%` } },
          limit: 2,
        });
        res.json({
          message: `Il y a ${cars.length} voitures qui correspondent aux termes de recherche`,
          data: cars,
        });
      } else {
        const cars = await Car.findAll();
        res.json({
          message: `Il y a ${cars.length} voitures dans la liste:`,
          data: cars,
        });
      }
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
