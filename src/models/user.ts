import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import CONNECTION from "../config/db.ts";
import mysql from "mysql2/promise";
import type User from "../types/user.ts";

export default class UserModel {
  static register = async ({
    username,
    password,
  }: Omit<User, "id">): Promise<
    | {
        id: string;
        username: string;
        token: string;
        error?: string;
      }
    | {
        error: string;
        token?: string;
      }
  > => {
    const HASHED_PASSWORD = await hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    try {
      await CONNECTION.query(
        `INSERT INTO Users (username, password) VALUES
            (? , ?);`,
        [username, HASHED_PASSWORD]
      );

      const [USER] = await CONNECTION.query<
        Omit<User, "password">[] & mysql.RowDataPacket[]
      >(`SELECT BIN_TO_UUID(id) as id, username FROM Users WHERE username = ?`, [
        username,
      ]);

      const TOKEN = jwt.sign(USER[0], process.env.SECRET_KEY!, {
        expiresIn: "1h",
      });

      return { token: TOKEN, ...USER[0] };
    } catch (error) {
      if (error.sqlMessage.includes("Duplicate"))
        return { error: "El nombre de usuario ya existe" };
      return { error: "Ha ocurrido un error" };
    }
  };

  static signIn = async ({
    username,
    password,
  }): Promise<
    | {
        id: string;
        username: string;
        token: string;
        error?: string;
      }
    | {
        error: string;
        token?: string;
      }
  > => {
    try {
      const [USER] = await CONNECTION.query<User[] & mysql.RowDataPacket[]>(
        `SELECT BIN_TO_UUID(id) as id, username, password FROM Users WHERE username = ?`,
        [username]
      );

      if (USER.length === 0) return { error: "El usuario no existe" };

      const arePasswordEqual = await compare(password, USER[0].password);

      if (!arePasswordEqual)
        return { error: "El usuario o contraseña es incorrecto" };

      const { password: _, ...rest } = USER[0];

      const TOKEN = jwt.sign(rest, process.env.SECRET_KEY!, {
        expiresIn: "1h",
      });

      return { token: TOKEN, ...rest };
    } catch (error) {
      return { error: "Ha ocurrido un error" };
    }
  };
}
