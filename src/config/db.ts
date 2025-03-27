import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: process.env.HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  port: process.env.DB_PORT ?? 3306,
  password: process.env.DB_PASSWORD ?? "password",
  database: process.env.DB_NAME ?? "beer_app_db",
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

await CONNECTION.query(`CREATE TABLE IF NOT EXISTS Carts (
	id INT AUTO_INCREMENT PRIMARY KEY,
  user_id BINARY(16) NOT NULL,
  beer_id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price INT,
  quantity INT NOT NULL CHECK (quantity > 0),
  UNIQUE (user_id, beer_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (beer_id) REFERENCES beers(id) ON DELETE CASCADE
  );`);

await CONNECTION.query(`CREATE TABLE IF NOT EXISTS Payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_created VARCHAR(255) NOT NULL,
  total_amount INT NOT NULL,
  user_id BINARY(16) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
  );`);

await CONNECTION.query(`CREATE TABLE IF NOT EXISTS PaymentItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_id INT NOT NULL,
    beer_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price INT,
    name VARCHAR(30) NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES Payments(id) ON DELETE CASCADE,
    FOREIGN KEY (beer_id) REFERENCES Beers(id) ON DELETE CASCADE
);`);
