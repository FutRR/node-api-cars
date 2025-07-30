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
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
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
