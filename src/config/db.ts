import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "password",
  database: "beer_app_db",
};

const CONNECTION = await mysql.createConnection(
  process.env.DATABASE_URL! ?? DEFAULT_CONFIG
);

await CONNECTION.query(`CREATE TABLE IF NOT EXISTS Auth (
  id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  username VARCHAR(32) UNIQUE NOT NULL,
  password VARCHAR(64) NOT NULL
  );`);

await CONNECTION.query(`CREATE TABLE IF NOT EXISTS Beers(
	id int auto_increment primary key,
    name varchar(30),
    description text,
	image varchar(255),
	color enum("Rubia", "Roja", "Negra"),
	density enum("Ligero", "Medio", "Alto"),
	abv float,
	ibu float,
  price int
);`);

export default CONNECTION;
