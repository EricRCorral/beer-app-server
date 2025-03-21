import { Router } from "express";
import BeerController from "../controllers/beers.ts";

const BEERS_ROUTER = Router();

BEERS_ROUTER.get("/", BeerController.getByFilters);
BEERS_ROUTER.get("/best-sellers", BeerController.getBestSellers);
BEERS_ROUTER.get("/:id", BeerController.getById);

export default BEERS_ROUTER;
