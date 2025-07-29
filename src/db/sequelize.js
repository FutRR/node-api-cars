const { Sequelize } = require("sequelize");

const testConnexion = async () => {
  try {
    await Sequelize.authenticate();
    console.log("Connexion réussie à la BDD.");
  } catch (error) {
    console.error("Connexion à la BDD impossible:", error);
  }
};

testConnexion();
