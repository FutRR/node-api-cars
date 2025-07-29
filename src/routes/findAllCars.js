module.exports = (app, Car) => {
  app.get("/api/cars", async (req, res) => {
    try {
      const cars = await Car.findAll();
      res.json({ message: "Liste des voitures", data: cars });
    } catch (error) {
      res.json({
        message: "Récupération de la liste des voitures échouée: ",
        error,
      });
    }
  });
};
