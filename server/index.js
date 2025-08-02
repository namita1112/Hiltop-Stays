const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require('razorpay');
require("dotenv").config();

const app = express();

const allowedOrigins = [
  'https://hiltopstay.com',
  'https://mahabaleshwar.hiltopstay.com',
];

if (process.env.ENV_MODE === "local") {
  // Allow all origins in development
  app.use(cors());
  console.log("CORS: Development mode (open CORS)");
} else {
  // Restrict origins in production
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
  console.log("CORS: Production mode (restricted CORS)");
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working fine 🚀");
});

const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api", hotelRoutes);
app.use("/api", roomRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/booking", bookingRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  })
  .catch((err) => console.error(err));
