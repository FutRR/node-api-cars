const { DataTypes } = require("sequelize");
const { sendError } = require("../helpers/helper");
// const { Sequelize } = require("../db/sequelize");

const validConductors = [
  "Jean Dupont",
  "Julie Martin",
  "Ali Ben",
  "Sarah Lemoine",
  "Michel Duran",
  "Nina Giraud",
  "Loïc Moreau",
  "Chloé Fabre",
  "Thomas Leclerc",
  "Emma Barret",
  "Yassine Hamdi",
  "Alice Renard",
];

module.exports = (sequelize) => {
  return sequelize.define(
    "Car",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: this.name,
          msg: "Le modèle doit être unique",
        },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise." },
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La marque ne peut pas être vide." },
          notNull: { msg: "La marque est une propriété requise." },
          len: {
            args: [3, 20],
            msg: "La marque doit contenir au moins 3 caractères",
          },
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "L'année de construction  est obligatoire." },
          notNull: { msg: "L'année est une propriété requise." },
          isInt: { msg: "L'année doit être un entier." },
          min: {
            args: [1900],
            msg: "L'année doit être supérieur ou égale a 1900.",
          },
          max: {
            args: [2025],
            msg: "L'année doit être inférieure ou égale à 2025.",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: { msg: "L'image doit être une URL." },
        },
      },
      assignedTo: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          const value = this.getDataValue("assignedTo");
          return value ? value.split(",") : [];
        },
        set(value) {
          this.setDataValue(
            "assignedTo",
            Array.isArray(value) ? value.join(",") : value
          );
        },
        validate: {
          notEmpty: { msg: "Le conducteur doit avoir un nom." },
          isConductorsValid(value) {
            if (value.split(",").length > 3) {
              throw new Error(
                "Une voiture ne peut avoir plus de 3 conducteurs"
              );
            }
            if (!value && value.split(",").length < 1) {
              throw new Error("Une voiture à besoin d'au moins 1 conducteur");
            }
            value.split(",").forEach((element) => {
              if (!validConductors.includes(element)) {
                throw new Error(
                  `Le conducteur doit appartenir à la liste suivante: ${validConductors}`
                );
              }
            });
          },
        },
      },
      assignementDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
