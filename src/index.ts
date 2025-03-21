import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import BEERS_ROUTER from "./routes/beers.ts";
import USER_ROUTER from "./routes/user.ts";
import WISHLIST_ROUTER from "./routes/wishlist.ts";
import CART_ROUTER from "./routes/cart.ts";
import PAYMENTS_ROUTER from "./routes/payment.ts";

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://localhost:5173";

const APP = express();

const CORS_CONFIG = { origin: [ALLOWED_ORIGIN], credentials: true };

APP.use(cors(CORS_CONFIG));
APP.use(cookieParser());
APP.use(express.json());

APP.use("/beers", BEERS_ROUTER);
APP.use("/user", USER_ROUTER);
APP.use("/wishlist", WISHLIST_ROUTER);
APP.use("/cart", CART_ROUTER);
APP.use("/payments", PAYMENTS_ROUTER);

APP.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
