const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db_config");
const authRoutes = require("./routes/AuthRoute");
const contestRoutes = require("./routes/ContestRoute");


const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

/* ===== DB ===== */
connectDB();

/* ===== ROUTES ===== */
app.use("/", authRoutes);
app.use("/api/contests", contestRoutes); 

/* ===== START SERVER ===== */
app.listen(5000, () => {
  console.log("🚀 Auth server running at http://localhost:5000");
});
