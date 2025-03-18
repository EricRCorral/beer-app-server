import express from "express";
import CheckoutModel from "../models/checkout.ts";

export default class CheckoutController {
  static createPreference: express.RequestHandler = async (req, res) => {
    const RESP = await CheckoutModel.createPreference(req.body);

    res.json(RESP);
  };

  static savePayment: express.RequestHandler = async (req, res) => {
    await CheckoutModel.savePayment(req.body);

    res.send();
  };
}
