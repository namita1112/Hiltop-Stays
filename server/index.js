const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  'https://hiltopstay.com',
  'https://mahabaleshwar.hiltopstay.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working fine 🚀");
});

const hotelRoutes = require("./routes/hotelRoutes");
app.use("/api", hotelRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  })
  .catch((err) => console.error(err));
