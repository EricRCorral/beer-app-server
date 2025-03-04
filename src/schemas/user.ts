import { object, string } from "zod";

const USER_SCHEMA = object({
  username: string().min(
    4,
    "El nombre de usuario debe tener al menos 4 caracteres"
  ),
  password: string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

const validateUser = (input: { username: string; password: string }) =>
  USER_SCHEMA.safeParse(input);

export default validateUser;
