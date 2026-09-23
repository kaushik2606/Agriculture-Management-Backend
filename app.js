require("dotenv").config();

const express = require("express");

const farmerRoutes = require("./routes/farmerRoutes");
const farmRoutes = require("./routes/farmRoutes");
const cropsRoutes = require("./routes/cropsRoutes");
const soilTestRoutes = require("./routes/soilTestRoutes")
const fertilizerRoutes = require("./routes/fertilizerRoutes")

const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/farmers", farmerRoutes);
app.use("/api/farm", farmRoutes);
app.use("/api/crops", cropsRoutes);
app.use("/api/soil-tests", soilTestRoutes)
app.use("/api/fertilizer", fertilizerRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Start Successfully");
});
