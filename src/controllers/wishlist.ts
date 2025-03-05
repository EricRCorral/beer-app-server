import express from "express";
import WishlistModel from "../models/wishlist.ts";

export default class WishlistController {
  static getWishlist: express.RequestHandler = async (req, res) => {
    const { id } = req.params;

    const FAVS = await WishlistModel.getWishlist(id);

    res.json(FAVS);
  };

  static addWishlist: express.RequestHandler = async (req, res) => {
    const { userId, beerId } = req.body;

    await WishlistModel.addWishlist(userId, beerId);

    res.status(204).send();
  };

  static removeWishlist: express.RequestHandler = async (req, res) => {
    const { userId, beerId } = req.body;

    await WishlistModel.removeWishlist(userId, beerId);

    res.status(204).send();
  };
}
