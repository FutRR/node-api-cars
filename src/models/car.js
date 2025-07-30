const { DataTypes } = require("sequelize");
// const { Sequelize } = require("../db/sequelize");

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
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "L'année ne peut pas être vide." },
          notNull: { msg: "L'année est une propriété requise." },
          isInt: { msg: "L'année doit être un entier." },
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
