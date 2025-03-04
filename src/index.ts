import express from "express";
import cors from "cors";
import BEERS_ROUTER from "./routes/beers.ts";
import cookieParser from "cookie-parser";
import AUTH_ROUTER from "./routes/auth.ts";

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

const APP = express();

const CORS_CONFIG = { origin: [ALLOWED_ORIGIN], credentials: true };

APP.use(cors(CORS_CONFIG));
APP.use(cookieParser());
APP.use(express.json());

APP.use("/beers", BEERS_ROUTER);
APP.use("/auth", AUTH_ROUTER);

APP.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
