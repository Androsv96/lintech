# Lintech

This repo contains an assesment from Lintech. It is built on NodeJs and Express. I'm using Heroku's database services (Postgres) to store data.
You can run the app locally and test it with **Postman**

## Eslint
I have used Eslint as linting tool. To run it, you must run this command: `npm run lint`

## ENV file

To be able to run the app, a `.env` file must be created in the project's root. It must contain this:

```
DATABASE=##
USERNAME=##
PASSWORD=##
HOST=##
```

where the `##` must be replaced for database's credentials.

## Test app

To test the app, you must run this command: `npm run test`.

## Run app

To run the application on local, you must run this command: `npm run node`. This will create the database and tables if they do not exist.

## Interacting with the API

To interact with the API I recommend using **Postman**.
There is two endpoints availables based on requirements: `/purchases` and `/sales`.

To hit the `/purchases` endpoint, a request like this must be sent:

- HTTP method: `POST`
- link/url: `localhost:3000/purchases` (port 3000 by default)
- body:

```
{
    "date" : "2021-02-28",
    "productId": 1,
    "productName" : "Vanish",
    "quantity": 2
}
```

To hit the `/sales` endpoint, a request like this must be sent:

- HTTP method: `POST`
- link/url: `localhost:3000/sales` (port 3000 by default)
- body:

```
{
    "date" : "2021-02-28",
    "productId": 1,
    "productName" : "Vanish",
    "quantity": 2
}
```
