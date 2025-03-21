import express from "express";
import BeerModel from "../models/beer.ts";
import type { Color, Density } from "../types/beer.ts";

export default class BeerController {
  static getByFilters = async (
    req: express.Request<
      {},
      {},
      {},
      {
        color: Color;
        density: Density;
      }
    >,
    res: express.Response
  ) => {
    const { color, density } = req.query;
    try {
      const beers = await BeerModel.getByFilters(color, density);

      res.json(beers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getById: express.RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
      const beer = await BeerModel.getById(id);

      if (!beer) {
        res.status(404).json({ error: "No se a encontrado el producto" });
        return;
      }

      res.json(beer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getBestSellers: express.RequestHandler = async (_, res) => {
    try {
      const BEST_SELLERS = await BeerModel.getBestSellers();

      res.json(BEST_SELLERS);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
