# Welcome to BeerApp!

**This is the server and work together with this [client](https://github.com/EricRCorral/beer-app-server). In the next section you will find the required steps to run this project.**

---

# Installations and configurations

1. Clone repository
2. Run `npm i` to install dependencies
3. Create an `.env` file and add the following values:

   - PORT: server port
   - ALLOWED_ORIGIN: clients url
   - SALT_ROUNDS: used when hash passwords
   - SECRET_KEY: used with jwt
   - ACCESS_TOKEN_MP: follow the first item in step 3 from [here](https://github.com/EricRCorral/beer-app-client?tab=readme-ov-file#installations-and-configurations) and just below your public key there will be the access token
   - HOST: database host
   - DB_USER: your database username
   - DB_PASSWORD: your database password
   - DB_NAME: database name (by default it is `beer_app_db`)
   - DB_PORT: database port
   - NGROK_URL: follow next step

4. Sign up in [Ngrok](https://ngrok.com/) and follow the steps from [setup](https://dashboard.ngrok.com/get-started/setup) and copy the value `--url` from static domain and save as value for `NGROK_URL` in `.env` file. Also in your `package.json` set this value in the `ngrok` script replacing `YOUR_NGROK_URL`.

5. If you followed [these steps](https://github.com/EricRCorral/beer-app-client?tab=readme-ov-file#installations-and-configurations) you should have a seller account, sign in and go to your application, in Webhooks add your full NGROK_URL with https and then `/checkout/webhook`. So it should be something like`https://{YOUR_NGROK_URL}/checkout/webhook`, check payment events and save. It is necessary to make payments work with our database.

6. Create a database called `beer_app_db` or whatever name you want (be sure is the same as `DB_NAME` from `.env` file).

7. Run `npm run populate` to populate with some beers your database.

8. Run `npm run dev` to start your server by default at [localhost:3000](http://localhost:3000/).

9. Run `npm run ngrok` to deploy your server with ngrok services.
