const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const cars = require("./mock-cars");
const { success } = require("./helper");

app.use(morgan("dev"));

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

  if (!car.id) {
    return res.status(400).json({ error: "Identifiant introuvable" });
  }

  res.json(success(message, car));

  if (!car) {
    return res.status(404).json({ error: "Voiture introuvable" });
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
