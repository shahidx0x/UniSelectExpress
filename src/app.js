const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const errorMiddleware = require("./middleware/error_middleware");
const authRoutes = require("./routes/auth_routes");
const userRoutes = require("./routes/user_routes");
const multer_router = require("./multer/multer.route");
const university_register_router = require("./routes/university_register_routes");
// const productRoutes = require("./routes/product_routes");
// const winston = require("./config/winston");

const app = express();

// Middleware
// app.use(morgan("combined", { stream: winston.stream.write }));
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  keyGenerator: (req) => {
    return req.ip;
  },
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Routes
app.get("/", (req, res, next) =>
  res.status(200).json({ message: "server ok" })
);
app.get("/log", (req, res) => {
  res.sendFile(path.join(__dirname, "stderr.log"));
});
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", multer_router);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/register/university",university_register_router)
// app.use("/api/products", productRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
