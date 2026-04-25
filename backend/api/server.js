import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

/* ===============================
   SECURITY MIDDLEWARE
================================= */

// Headers sécurité
app.use(helmet({
  contentSecurityPolicy: false
}));

// CORS sécurisé
const allowedOrigins = [
  "https://structarchi.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
}));

// Limite JSON
app.use(express.json({ limit: "1mb" }));

// Rate limit (anti attaque)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

/* ===============================
   UTILS VALIDATION
================================= */

// Nettoyage basique input
const sanitize = (str) => {
  return String(str).replace(/[<>]/g, "");
};

// Email validation
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/* ===============================
   ROUTES API
================================= */

// TEST API
app.get("/", (req, res) => {
  res.json({
    status: "StructArchi Backend Online",
    security: "Enabled",
    version: "2026.2",
    uptime: process.uptime()
  });
});

// CONTACT FORM
app.post("/contact", (req, res) => {
  try {
    let { name, email, message } = req.body;

    // validation champs
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    // nettoyage
    name = sanitize(name);
    email = sanitize(email);
    message = sanitize(message);

    // validation email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format"
      });
    }

    // limite longueur (anti spam)
    if (message.length > 1000) {
      return res.status(400).json({
        error: "Message too long"
      });
    }

    // log propre (sans données sensibles)
    console.log("📩 New contact request received");

    // réponse
    res.json({
      success: true,
      message: "Message received successfully"
    });

  } catch (error) {
    console.error("❌ Error:", error.message);

    res.status(500).json({
      error: "Internal server error"
    });
  }
});

/* ===============================
   404 HANDLER
================================= */

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

/* ===============================
   GLOBAL ERROR HANDLER
================================= */

app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.message);

  res.status(500).json({
    error: "Something went wrong"
  });
});

/* ===============================
   EXPORT FOR VERCEL
================================= */

export default app;