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

export default CONNECTION;
