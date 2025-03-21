import mysql from "mysql2/promise";
import CONNECTION from "../config/db.ts";
import type { Beer, Color, Density } from "../types/beer.ts";
import type { PaymentItem } from "../types/paymentItem.ts";

export default class BeerModel {
  static getByFilters: (
    color: Color,
    density: Density
  ) => Promise<Beer[] | void> = async (color, density) => {
    try {
      const [beers] = await CONNECTION.query<Beer[] & mysql.RowDataPacket[]>(
        `SELECT id, color, image, price, density, name FROM Beers WHERE
        (? IS NULL OR color = ?) AND 
        (? IS NULL OR density = ?)`,
        [color, color, density, density]
      );

      return beers;
    } catch (error) {
      console.log(error);
    }
  };

  static getById: (id: string) => Promise<Beer | void> = async (id: string) => {
    try {
      const [beers] = await CONNECTION.query<Beer[] & mysql.RowDataPacket[]>(
        `SELECT * FROM Beers WHERE id = ?`,
        [id]
      );

      return beers[0];
    } catch (error) {
      console.log(error);
    }
  };

  static getBestSellers = async () => {
    try {
      const [PAYMENT_ITEMS] = await CONNECTION.query<
        PaymentItem[] & mysql.RowDataPacket[]
      >("SELECT * FROM PaymentItems");

      let beersQuantities: { beer_id?: number; quantity?: number } = {};

      PAYMENT_ITEMS.forEach(({ beer_id, quantity }) => {
        if (!!beersQuantities[beer_id]) {
          beersQuantities[beer_id] += quantity;
          return;
        }
        beersQuantities[beer_id] = quantity;
      });

      const BEST_SELLERS_ID = Object.entries(beersQuantities)
        .sort(([_, a], [__, b]) => b - a)
        .slice(0, 6)
        .flat()
        .filter((value) => typeof value === "string");

      const BEST_SELLERS: Beer[] = [];

      await new Promise((res) => {
        BEST_SELLERS_ID.forEach(async (id, index) => {
          const [BEER] = await CONNECTION.query<Beer[] & mysql.RowDataPacket[]>(
            `SELECT id, image, name, description FROM Beers WHERE id = ?`,
            [id]
          );

          BEST_SELLERS.push(BEER[0]);

          if (BEST_SELLERS_ID.length - 1 === index) res(BEST_SELLERS);
        });
      });

      return BEST_SELLERS;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}
