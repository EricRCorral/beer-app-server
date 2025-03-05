import { Router } from "express";
import WishlistController from "../controllers/wishlist.ts";

const WISHLIST_ROUTER = Router();

WISHLIST_ROUTER.get("/:id", WishlistController.getWishlist);
WISHLIST_ROUTER.post("/", WishlistController.addWishlist);
WISHLIST_ROUTER.delete("/", WishlistController.removeWishlist);

export default WISHLIST_ROUTER;
