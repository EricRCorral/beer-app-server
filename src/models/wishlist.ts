import CONNECTION from "../config/db.ts";
import mysql from "mysql2/promise";
import type Wishlist from "../types/wishlist.ts";

export default class WishlistModel {
  static getWishlist = async (userId: string) => {
    try {
      const [beers_ids] = await CONNECTION.query<
        Omit<Wishlist, "user_id">[] & mysql.RowDataPacket[]
      >(`SELECT beer_id FROM  Wishlists WHERE BIN_TO_UUID(user_id) = ?`, [
        userId,
      ]);

      return beers_ids.map(({ beer_id }) => beer_id);
    } catch (error) {
      console.log(error);
    }
  };

  static addWishlist = async (userId: string, beerId: number) => {
    try {
      await CONNECTION.query(
        `INSERT IGNORE INTO Wishlists (user_id, beer_id) VALUES (UUID_TO_BIN(?), ?)`,
        [userId, beerId]
      );
    } catch (error) {
      console.log(error);
    }
  };

  static removeWishlist = async (userId: string, beerId: number) => {
    try {
      await CONNECTION.query(
        `DELETE FROM Wishlists WHERE BIN_TO_UUID(user_id) = ? AND beer_id = ?`,
        [userId, beerId]
      );
    } catch (error) {
      console.log(error);
    }
  };
}
