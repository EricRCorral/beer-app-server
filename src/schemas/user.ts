import { array, object, string } from "zod";

const USER_SCHEMA = object({
  wishList: array(string()).nullable(),
  cart: array(string()).nullable(),
});

const validateUser = (input: {
  wishList: string[] | null;
  cart: string[] | null;
}) => USER_SCHEMA.safeParse(input);

export default validateUser;
