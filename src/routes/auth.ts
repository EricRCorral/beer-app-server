import { Router } from "express";
import AuthController from "../controllers/auth.ts";

const AUTH_ROUTER = Router();

AUTH_ROUTER.post("/register", AuthController.register);
AUTH_ROUTER.post("/signin", AuthController.signIn);
AUTH_ROUTER.get("/logout", AuthController.logout);
AUTH_ROUTER.get("/session", AuthController.session);

export default AUTH_ROUTER;
