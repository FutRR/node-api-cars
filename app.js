const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const { initDb } = require("./src/db/sequelize");
const { sendError } = require("./src/helpers/helper");

// Middlewares
app.use(favicon(__dirname + "/public/pakistan.ico"));
app.use(morgan("dev"));
app.use(bodyParser.json());

// Initialisation BDD
initDb();

//Routes
//Car
require("./src/routes/findAllCars")(app);
require("./src/routes/findCarByPk")(app);
require("./src/routes/createCar")(app);
require("./src/routes/updateCar")(app);
require("./src/routes/deleteCar")(app);

//User
require("./src/routes/login")(app);

// Middleware 404
app.use((req, res) => {
  sendError(res, 404, "Ressource introuvable");
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
