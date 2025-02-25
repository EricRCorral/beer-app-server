import mysql from "mysql2/promise";
import CONNECTION from "../config/db.ts";

export type Color = "Rubia" | "Roja" | "Negra";
export type Density = "Ligero" | "Medio" | "Alto";
type Beer = {
  name: string;
  description: string;
  image: string;
  color: Color;
  density: Density;
  abv: number;
  ibu: number;
};

export default class BeerModel {
  static getByFilters: (
    color: Color,
    density: Density
  ) => Promise<Beer[] | void> = async (color, density) => {
    try {
      const [beers] = await CONNECTION.query<Beer[] & mysql.RowDataPacket[]>(
        `SELECT * FROM Beers WHERE
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
}
