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

await CONNECTION.query(`CREATE TABLE IF NOT EXISTS Users (
  id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  username VARCHAR(32) UNIQUE NOT NULL,
  password VARCHAR(64) NOT NULL
  );`);

await CONNECTION.query(`CREATE TABLE IF NOT EXISTS Beers(
	id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
  description TEXT,
	image VARCHAR(255),
	color ENUM("Rubia", "Roja", "Negra"),
	density ENUM("Ligero", "Medio", "Alto"),
	abv FLOAT,
	ibu FLOAT,
  price INT
);`);

await CONNECTION.query(`CREATE TABLE IF NOT EXISTS WishLists (
  user_id BINARY(16) NOT NULL,
  beer_id INT NOT NULL,
  PRIMARY KEY (user_id, beer_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (beer_id) REFERENCES beers(id) ON DELETE CASCADE
  );`);

export default CONNECTION;
