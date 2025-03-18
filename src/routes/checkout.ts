import { Router } from "express";
import CheckoutController from "../controllers/checkout.ts";

const CHECKOUT_ROUTER = Router();

CHECKOUT_ROUTER.post("/create_preference", CheckoutController.createPreference);
CHECKOUT_ROUTER.post("/webhook", CheckoutController.savePayment);

export default CHECKOUT_ROUTER;
