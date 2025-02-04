import express from "express";
import { createServer } from "node:http";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

const APP = express();
const SERVER = createServer(APP);

const CORS_CONFIG = { origin: [ALLOWED_ORIGIN] };

APP.use(cors(CORS_CONFIG));

APP.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

SERVER.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
