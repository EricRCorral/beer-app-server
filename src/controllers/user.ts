import express from "express";
import UserModel from "../models/user.ts";
import validateUser from "../schemas/user.ts";
import jwt from "jsonwebtoken";
import type User from "../types/user.ts";

const handleValidateUser = (
  req: express.Request<any, any, User>,
  res: express.Response
) => {
  const VALIDATED_USER = validateUser(req.body);

  if (!VALIDATED_USER.success)
    res.status(400).json({
      error: VALIDATED_USER.error.errors
        .map(({ message }) => message)
        .join("\n"),
    });

  return VALIDATED_USER;
};

export default class UserController {
  static register: express.RequestHandler<any, any, User> = async (
    req,
    res
  ) => {
    const VALIDATED_USER = handleValidateUser(req, res);

    if (!VALIDATED_USER.success) return;

    const resp = await UserModel.register(VALIDATED_USER.data);

    if (!!resp?.error) {
      res.status(400).json(resp);
      return;
    }

    const { token, ...rest } = resp;

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .json(rest);
  };

  static signIn: express.RequestHandler<any, any, User> = async (req, res) => {
    const VALIDATED_USER = handleValidateUser(req, res);

    if (!VALIDATED_USER.success) return;

    const resp = await UserModel.signIn(VALIDATED_USER.data);

    if (!!resp?.error) {
      res.status(400).json(resp);
      return;
    }

    const { token, ...rest } = resp;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
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
