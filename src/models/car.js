const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Car = sequelize.define(
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
        return this.getDataValue("assignedTo").split(",");
      },
      set() {
        this.setDataValue("assignedTo", value.join(","));
      },
    },
    assignementDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW(),
    },
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: false,
  }
);

module.exports = Car;
