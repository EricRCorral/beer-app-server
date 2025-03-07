import express from "express";
import CartModel from "../models/cart.ts";

export default class CartController {
  static getCart: express.RequestHandler = async (req, res) => {
    const { id } = req.params;

    const cart = await CartModel.getCart(id);

    res.json(cart);
  };

  static addCart: express.RequestHandler = async (req, res) => {
    const { userId, beerId, name, image, price, quantity } = req.body;

    await CartModel.addCart(userId, beerId, quantity, name, image, price);

    res.status(204).send();
  };

  static removeCart: express.RequestHandler = async (req, res) => {
    const { userId, beerId } = req.body;

    await CartModel.removeCart(userId, beerId);

    res.status(204).send();
  };
}
