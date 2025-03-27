import CONNECTION from "./db.ts";
import type { Beer } from "../types/beer";

const BEERS: Omit<Beer, "id">[] = [
  {
    image: "https://i.imgur.com/rL0fR6b.png",
    price: 4000,
    name: "IPA",
    abv: 6.5,
    ibu: 55,
    color: "Rubia",
    density: "Medio",
    description:
      "Cerveza de carácter lupulado con aromas y sabores intensos a cítricos, resina y frutas tropicales. Amargor notable con un ligero soporte de malta.",
  },
  {
    image: "https://i.imgur.com/IynHW0B.png",
    price: 4000,
    name: "APA",
    abv: 5.2,
    ibu: 40,
    color: "Rubia",
    density: "Ligero",
    description:
      "Equilibrada entre malta y lúpulo, con notas cítricas y florales. Suave amargor y final refrescante.",
  },
  {
    image: "https://i.imgur.com/s9wCCBL.png",
    price: 3000,
    name: "Stout",
    abv: 5.8,
    ibu: 35,
    color: "Negra",
    density: "Medio",
    description:
      "Cerveza oscura y cremosa con sabores intensos a café, chocolate y caramelo tostado. Amargor moderado proveniente de la malta tostada.",
  },
  {
    image: "https://i.imgur.com/szydb4G.png",
    price: 3000,
    name: "Honey",
    abv: 5.0,
    ibu: 18,
    color: "Rubia",
    density: "Ligero",
    description:
      "Cerveza suave con un dulzor sutil aportado por la miel. Refrescante y de carbonatación moderada.",
  },
  {
    image: "https://i.imgur.com/MAgdDbA.png",
    price: 3500,
    name: "Scottish",
    abv: 5.4,
    ibu: 20,
    color: "Roja",
    density: "Medio",
    description:
      "Cerveza maltosa con notas a caramelo, toffee y un ligero tostado. Bajo amargor y final suave.",
  },
  {
    image: "https://i.imgur.com/sBPGbVJ.png",
    price: 3500,
    name: "Golden Ale",
    abv: 5.0,
    ibu: 20,
    color: "Rubia",
    density: "Ligero",
    description:
      "Cerveza ligera y refrescante con equilibrio entre dulzura de la malta y amargor sutil del lúpulo. Notas a pan, miel y un toque floral.",
  },
  {
    image: "https://i.imgur.com/QLk4SXN.png",
    price: 3000,
    name: "Pilsner",
    abv: 4.8,
    ibu: 35,
    color: "Rubia",
    density: "Ligero",
    description:
      "Cerveza lager clara y refrescante con notas florales y herbales del lúpulo. Final seco y crujiente.",
  },
  {
    image: "https://i.imgur.com/DQcQbTx.png",
    price: 3500,
    name: "Amber Ale",
    abv: 5.6,
    ibu: 35,
    color: "Roja",
    density: "Medio",
    description:
      "Equilibrada entre malta y lúpulo, con notas a caramelo, nuez y un tostado suave. Amargor moderado y final limpio.",
  },
  {
    image: "https://i.imgur.com/vkHSjHP.png",
    price: 4500,
    name: "Barleywine",
    abv: 10.5,
    ibu: 70,
    color: "Negra",
    density: "Alto",
    description:
      "Cerveza intensa con alto contenido alcohólico y notas a caramelo, frutos secos y leve dulzor residual.",
  },
  {
    image: "https://i.imgur.com/hLKMEyo.png",
    price: 3500,
    name: "Porter",
    abv: 5.4,
    ibu: 30,
    color: "Negra",
    density: "Medio",
    description:
      "Cerveza oscura con sabores a chocolate, café y nueces tostadas. Menos densa y alcohólica que una stout, pero con un carácter similar.",
  },
];

BEERS.forEach(
  async (
    { abv, color, density, description, ibu, image, name, price },
    index
  ) => {
    await CONNECTION.query(
      `INSERT INTO Beers (name, description, image, color, density, abv, ibu, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [name, description, image, color, density, abv, ibu, price]
    );

    if (index === BEERS.length - 1) {
      console.log(`Inserted ${BEERS.length} beers in your database!`);
      process.exit();
    }
  }
);
