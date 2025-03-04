export type Color = "Rubia" | "Roja" | "Negra";
export type Density = "Ligero" | "Medio" | "Alto";
export type Beer = {
  name: string;
  description: string;
  image: string;
  color: Color;
  density: Density;
  abv: number;
  ibu: number;
};
