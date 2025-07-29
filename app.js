const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const cars = require("./mock-cars");
const { success, getUniqueId } = require("./helper");

app.use(favicon(__dirname + "/pakistan.ico"));
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
  console.log(car);

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
  const newCar = { ...req.body };
  const message = `La voiture ${car.brand} ${car.name} a bien été modifiée`;
  car = Object.assign(car, newCar);

  res.json(success(message, car));
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
