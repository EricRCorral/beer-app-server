import express from "express";
import cors from "cors";
import BEERS_ROUTER from "./routes/beers.ts";

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

const APP = express();

const CORS_CONFIG = { origin: [ALLOWED_ORIGIN] };

APP.use(cors(CORS_CONFIG));

APP.use("/beers", BEERS_ROUTER);

APP.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
