require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materialRoutes");
const aiRoutes = require("./routes/aiRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json({ limit: "2mb" }));

app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/", (req, res) => {
  res.json({
    name: "AI StudyBuddy Backend",
    status: "running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "AI StudyBuddy Backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/ai", aiRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`AI StudyBuddy backend running on port ${PORT}`);
  });
}

start();
