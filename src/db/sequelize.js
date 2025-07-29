const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("parc_auto", "root", "", {
  host: "localhost",
  port: 3307,
  dialect: "mariadb",
  logging: false,
});

const now = new Date();
const formattedDate = now.toLocaleString("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const testConnexion = async () => {
  try {
    await sequelize.authenticate();
    console.log(`${formattedDate} - Connexion réussie à la BDD.`);
  } catch (error) {
    console.error(`${formattedDate}Connexion à la BDD impossible:`, error);
  }
};

const syncDb = async () => {
  const Car = require("../models/car");
  await Car.sync({ force: true });
  console.log("Base de données synchronisée");
};

module.exports = {
  sequelize,
  testConnexion,
  syncDb,
};
