import { Router } from "express";
import CartController from "../controllers/cart.ts";

const CART_ROUTER = Router();

CART_ROUTER.get("/:id", CartController.getCart);
CART_ROUTER.post("/", CartController.addCart);
CART_ROUTER.delete("/", CartController.removeCart);

export default CART_ROUTER;
