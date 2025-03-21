import { Router } from "express";
import CheckoutController from "../controllers/payments.ts";

const PAYMENTS_ROUTER = Router();

PAYMENTS_ROUTER.post("/create_preference", CheckoutController.createPreference);
PAYMENTS_ROUTER.post("/webhook", CheckoutController.savePayment);
PAYMENTS_ROUTER.get("/:user_id", CheckoutController.getPayments);

export default PAYMENTS_ROUTER;
