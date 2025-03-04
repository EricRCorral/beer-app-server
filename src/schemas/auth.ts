import { object, string } from "zod";

const AUTH_SCHEMA = object({
  username: string().min(
    4,
    "El nombre de usuario debe tener al menos 4 caracteres"
  ),
  password: string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

const validateAuth = (input: { username: string; password: string }) =>
  AUTH_SCHEMA.safeParse(input);

export default validateAuth;
