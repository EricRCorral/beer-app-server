import mysql from "mysql2/promise";
import type Cart from "../types/cart";
import CONNECTION from "../config/db.ts";

export default class CartModel {
  static getCart = async (id: string) => {
    try {
      const [cart] = await CONNECTION.query<
        Omit<Cart, "user_id" | "id">[] & mysql.RowDataPacket[]
      >(
        `SELECT beer_id, name, image, price, quantity FROM Carts WHERE user_id = UUID_TO_BIN(?)`,
        [id]
      );

      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  static addCart = async (
    userId: string,
    beerId: number,
    quantity: number,
    name: string,
    image: string,
    price: number
  ) => {
    try {
      await CONNECTION.query(
        `INSERT INTO Carts (user_id, beer_id, name, image, price, quantity) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantity = ?`,
        [userId, beerId, name, image, price, quantity, quantity]
      );
    } catch (error) {
      console.log(error);
    }
  };

  static removeCart = async (user_id: string, beer_id: number) => {
    try {
      await CONNECTION.query(
        `DELETE FROM Carts WHERE user_id = UUID_TO_BIN(?) AND beer_id = ?`,
        [user_id, beer_id]
      );
    } catch (error) {
      console.log(error);
    }
  };
}
