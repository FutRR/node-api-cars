const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const { success, getUniqueId } = require("./helper");
const { sequelize, testConnexion, syncDb } = require("./src/db/sequelize");
const Car = require("./src/models/car")(sequelize);
let cars = require("./src/db/mock-cars");

//Routes
require("./src/routes/findAllCars")(app, Car);
require("./src/routes/findCarByPk")(app);
require("./src/routes/createCar")(app);
require("./src/routes/updateCar")(app);
require("./src/routes/deleteCar")(app);

// Initialisation de la DB
const initializeApp = async () => {
  try {
    await testConnexion();
    await syncDb();

    await Promise.all(
      cars.map(async (car) => {
        const createdCar = await Car.create({
          name: car.name,
          brand: car.brand,
          year: car.year,
          image: car.image,
          assignedTo: car.assignedTo,
          assignementDate: car.assignementDate || new Date(),
        });
        console.log(createdCar.toJSON());
      })
    );
  } catch (error) {
    console.error("Erreur d'initialisation:", error);
    process.exit(1);
  }
};

initializeApp();

// Middlewares
app.use(favicon(__dirname + "/public/pakistan.ico"));
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes API
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

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
