import { Router } from "express";
import UserController from "../controllers/user.ts";

const USER_ROUTER = Router();

USER_ROUTER.post("/register", UserController.register);
USER_ROUTER.post("/signin", UserController.signIn);
USER_ROUTER.get("/logout", UserController.logout);
USER_ROUTER.get("/session", UserController.session);

export default USER_ROUTER;
