import mysql from "mysql2/promise";
import CONNECTION from "../config/db.ts";
import { MercadoPagoConfig, Preference } from "mercadopago";
import type { Beer } from "../types/beer.ts";
import type { Payment } from "../types/payment.ts";
import type { PaymentItem } from "../types/paymentItem.ts";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_MP!;
const NGROK_URL = process.env.NGROK_URL;

const CLIENT = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
});

export default class PaymentModel {
  static createPreference = async (
    body: {
      id: string;
      quantity: number;
      title: string;
      unit_price: number;
      picture_url: string;
      user_id?: string;
    }[]
  ) => {
    try {
      const PREFERENCE = new Preference(CLIENT);

      const USER_ID = { user_id: body[0].user_id };

      body = body.map(({ id, quantity, title, unit_price, picture_url }) => ({
        id,
        quantity,
        title,
        unit_price,
        picture_url,
      }));

      const RESP = await PREFERENCE.create({
        body: {
          items: [...body],
          additional_info: JSON.stringify(USER_ID),
          back_urls: { success: "https://localhost:5173/" },
          redirect_urls: { success: "https://localhost:5173/" },
          auto_return: "approved",
          notification_url: `https://${NGROK_URL}/payments/webhook`,
        },
      });

      return RESP;
    } catch (error) {
      console.log(error);
    }
  };

  static savePayment = async ({ resource }: { resource?: string }) => {
    if (resource?.includes("https")) {
      try {
        const {
          order_status,
          additional_info,
          date_created,
          total_amount,
          items,
        }: {
          order_status: string;
          additional_info: string;
          items: PaymentItem[];
        } & Payment = await (
          await fetch(resource, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          })
        ).json();

        if (order_status === "paid") {
          const { user_id } = JSON.parse(additional_info);

          await CONNECTION.query(
            `INSERT INTO Payments (date_created, total_amount, user_id) VALUES (?, ?, UUID_TO_BIN(?))`,
            [date_created, total_amount, user_id]
          );

          const [payment_id] = await CONNECTION.query(
            `SELECT id FROM Payments ORDER BY id DESC LIMIT 1`
          );

          items.forEach(async ({ id, quantity, title, unit_price }) => {
            const [BEER] = await CONNECTION.query<
              Beer[] & mysql.RowDataPacket[]
            >(`SELECT image FROM Beers WHERE id = ?`, [id]);

            await CONNECTION.query(
              `INSERT INTO PaymentItems (payment_id, beer_id, quantity, price, name, image) VALUES (?, ?, ?, ?, ?, ?)`,
              [payment_id[0].id, id, quantity, unit_price, title, BEER[0].image]
            );
          });

          await CONNECTION.query(
            `DELETE FROM Carts WHERE user_id = UUID_TO_BIN(?)`,
            [user_id]
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  static getPayments = async (user_id: string) => {
    try {
      let payments: Omit<Payment & { items?: PaymentItem[] }, "user_id">[] = [];

      const [PAYMENTS] = await CONNECTION.query<
        Payment[] & mysql.RowDataPacket[]
      >(
        `SELECT * FROM Payments WHERE user_id = UUID_TO_BIN(?) ORDER BY date_created DESC`,
        [user_id]
      );

      if (PAYMENTS.length === 0) return [];

      payments = PAYMENTS.map(({ user_id, ...rest }) => ({ ...rest }));

      await new Promise((res) => {
        PAYMENTS.forEach(async ({ id }, index) => {
          const [PAYMENT_ITEMS] = await CONNECTION.query<
            PaymentItem[] & mysql.RowDataPacket[]
          >(`SELECT * FROM PaymentItems WHERE payment_id = ?`, [id]);

          payments[index].items = PAYMENT_ITEMS;

          if (PAYMENTS.length - 1 === index) res(payments);
        });
      });

      return payments;
    } catch (error) {
      console.log(error);
    }
  };
}
