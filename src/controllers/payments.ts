import express from "express";
import PaymentModel from "../models/payment.ts";

export default class PaymentsController {
  static createPreference: express.RequestHandler = async (req, res) => {
    const RESP = await PaymentModel.createPreference(req.body);

    res.json(RESP);
  };

  static savePayment: express.RequestHandler = async (req, res) => {
    await PaymentModel.savePayment(req.body);

    res.send();
  };

  static getPayments: express.RequestHandler = async (req, res) => {
    const PAYMENTS = await PaymentModel.getPayments(req.params.user_id);

    res.json(PAYMENTS);
  };
}
