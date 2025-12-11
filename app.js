const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );
app.use(express.static(path.resolve(__dirname, "./react_weather_search_app/dist")));
app.use(express.json());
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const favoritesSchema = new mongoose.Schema({
  city: String,
  state: String,
});

const Favorite = mongoose.model("favorites", favoritesSchema);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./react_weather_search_app/dist", "index.html"));
});

app.get("/dailyWeather", async (req, res) => {
  try {
    const queryParams = { ...req.query };
    queryParams.units = "imperial";
    queryParams.timezone = "America/Los_Angeles";
    queryParams.timesteps = "1h,1d";
    queryParams.startTime = "now";
    queryParams.endTime = "nowPlus5d";
    queryParams.fields =
      "temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,uvIndex,weatherCode,precipitationProbability,precipitationType,sunriseTime,sunsetTime,visibility,moonPhase,cloudCover";
    queryParams.apikey = process.env.TOMORROW_API_KEY;

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `https://api.tomorrow.io/v4/timelines?${queryString}`;

    const headers = {
      accept: "application/json",
      "Accept-Encoding": "gzip",
    };

    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get("/autocomplete", async (req, res) => {
  try {
    const { input } = req.query;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&types=locality&components=country:us&key=${process.env.GOOGLE_PLACES_API_KEY}`;
    const headers = {
      accept: "application/json",
      "Accept-Encoding": "gzip",
    };
    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get("/favorites", async (req, res) => {
  try {
    const cities = await Favorite.find();
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

app.post("/favorites", async (req, res) => {
  try {
    const { city, state } = req.body;
    const newFavorite = new Favorite({ city, state });
    await newFavorite.save();
    res.status(201).json({ message: "Favorite added successfully", favorite: newFavorite });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

app.delete("/favorites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

app.delete("/fav", async (req, res) => {
  try {
    const { city } = req.body;  // Assuming the city is passed in the request body
    const result = await Favorite.findOneAndDelete({ city: city });

    if (!result) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite deleted successfully" });
    console.error("deleting favorite:", result);
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
