import express from "express";
import AuthModel from "../models/auth.ts";
import validateAuth from "../schemas/auth.ts";
import jwt from "jsonwebtoken";
import type Auth from "../types/auth.ts";

const handleValidateAuth = (
  req: express.Request<any, any, Auth>,
  res: express.Response
) => {
  const VALIDATED_AUTH = validateAuth(req.body);

  if (!VALIDATED_AUTH.success)
    res.status(400).json({
      error: VALIDATED_AUTH.error.errors
        .map(({ message }) => message)
        .join("\n"),
    });

  return VALIDATED_AUTH;
};

export default class AuthController {
  static register: express.RequestHandler<any, any, Auth> = async (
    req,
    res
  ) => {
    const VALIDATED_AUTH = handleValidateAuth(req, res);

    if (!VALIDATED_AUTH.success) return;

    const resp = await AuthModel.register(VALIDATED_AUTH.data);

    if (!!resp?.error) {
      res.status(400).json(resp);
      return;
    }

    const { token, ...rest } = resp;

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json(rest);
  };

  static signIn: express.RequestHandler<any, any, Auth> = async (req, res) => {
    const VALIDATED_AUTH = handleValidateAuth(req, res);

    if (!VALIDATED_AUTH.success) return;

    const resp = await AuthModel.signIn(VALIDATED_AUTH.data);

    if (!!resp?.error) {
      res.status(400).json(resp);
      return;
    }

    const { token, ...rest } = resp;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json(rest);
  };

  static logout: express.RequestHandler = (_, res) => {
    res.clearCookie("access_token").status(204).send();
  };

  static session: express.RequestHandler = async (req, res) => {
    const TOKEN = req.cookies.access_token;

    if (!TOKEN) {
      res.status(401).send(false);
      return;
    }

    try {
      const resp = jwt.verify(TOKEN, process.env.SECRET_KEY!);

      res.json(resp);
    } catch (error) {
      res.status(401).json(false);
    }
  };
}
