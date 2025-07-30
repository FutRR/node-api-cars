// src/db/sequelize.js
const { Sequelize, DataTypes } = require("sequelize");
const CarModel = require("../models/car");
const UserModel = require("../models/user");
const cars = require("./mock-cars");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("parc_auto", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
  port: 3307,
});

const Car = CarModel(sequelize);
const User = UserModel(sequelize, DataTypes);

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion réussie à la BDD !");

    await sequelize.sync({ force: true });
    console.log("Modèles synchronisés avec la base de données.");

    await Promise.all(
      cars.map((car) =>
        Car.create({
          name: car.name,
          brand: car.brand,
          year: car.year,
          image: car.image,
          assignedTo: [car.assignedTo],
          assignementDate: car.assignementDate || new Date(),
        })
      )
    );

    const hash = await bcrypt.hash("jaimelespommes123", 10);
    await User.create({
      username: "FutRR",
      password: hash,
    });
    console.log((user) => console.log(user.toJSON()));

    console.log("Données mock insérées.");
  } catch (error) {
    console.error("Erreur de synchronisation BDD :", error);
  }
};

module.exports = { sequelize, initDb, Car, User };
