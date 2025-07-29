const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const { success, getUniqueId } = require("./helper");
const { sequelize, testConnexion } = require("./src/db/sequelize");
let cars = require("./src/db/mock-cars");

const initializeApp = async () => {
  try {
    await testConnexion();

    const Car = require("./src/models/car");
    await Car.sync({});
    console.log("Base de données synchronisée");

    // Start server only after DB is ready
    app.listen(port, () => {
      console.log(`Serveur lancé sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Erreur d'initialisation:", error);
    process.exit(1);
  }
};

initializeApp();

app.use(favicon(__dirname + "/public/pakistan.ico"));
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, Tester!");
});

app.get("/api/cars", (req, res) => {
  res.json(success(`Il y a ${cars.length} véhicules dans la liste`, cars));
});

app.get(`/api/cars/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find((car) => car.id === id);
  const message = "Une voiture à été trouvée";

  if (car == undefined) {
    return res.status(404).json({ error: "Identifiant introuvable" });
  }

  res.json(success(message, car));
});

app.post("/api/cars", (req, res) => {
  const id = getUniqueId(cars);
  const newCar = { ...req.body, ...{ id: id, assignementDate: new Date() } };
  const message = `La voiture ${newCar.brand} ${newCar.name} a bien été créée`;
  cars.push(newCar);

  res.json(success(message, newCar));
});

app.put(`/api/cars/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  let car = cars.find((car) => car.id === id);
  const newCar = { ...req.body, ...{ id: id, assignementDate: new Date() } };
  const message = `La voiture ${newCar.brand} ${newCar.name} a bien été modifiée`;

  if (car == undefined) {
    return res.status(404).json({ error: "Identifiant introuvable" });
  }

  car = Object.assign(car, newCar);
  res.json(success(message, car));
});

app.delete(`/api/cars/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex === -1) {
    return res.status(404).json({ error: "Identifiant introuvable" });
  }

  const car = cars[carIndex];
  const message = `La voiture ${car.brand} ${car.name} a bien été supprimée`;
  cars.splice(carIndex, 1);
  res.json(success(message));
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
