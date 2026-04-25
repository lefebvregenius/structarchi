import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

/* ===============================
   SECURITY MIDDLEWARE
================================= */

// Sécurité headers
app.use(helmet({
  contentSecurityPolicy: false // utile pour vidéos + assets externes
}));

// CORS sécurisé
app.use(cors({
  origin: [
    "https://structarchi.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST"]
}));

// JSON limit (anti spam / overload)
app.use(express.json({ limit: "1mb" }));

// Anti spam / attaque brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limite requêtes
  message: "Too many requests, please try again later."
});

app.use(limiter);

/* ===============================
   ROUTES API
================================= */

// TEST API
app.get("/", (req, res) => {
  res.json({
    status: "StructArchi Backend Online",
    security: "Enabled",
    version: "2026.1"
  });
});

// CONTACT FORM
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // validation simple
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  // log sécurisé
  console.log("NEW CONTACT REQUEST:");
  console.log(req.body);

  res.json({
    success: true,
    message: "Message received successfully"
  });
});

/* ===============================
   EXPORT FOR VERCEL
================================= */

export default app;