import express from "express";
import BeerModel from "../models/beer.ts";
import type { Color, Density } from "../models/beer.ts";

export default class BeerController {
  static getByFilters: express.RequestHandler<{
    color: Color;
    density: Density;
  }> = async (req, res) => {
    const { color, density } = req.params;
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
        res.status(404).json({ message: "No se a encontrado el producto" });
        return;
      }

      res.json(beer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
