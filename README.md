# Welcome to Grocery Booking Application

## Project Setup
- Clone the Project on your local
- Execute `npm install` on the same path as of your root directory of downloaded project
- Create a `.env` file in the  root directory and add the following enviroment variable
    - `PORT=3000`
    - `JWT_SECRET`
- Inside the `src/config` folder create a new file `config.js` and then add the following databases configuration

```
{
  "development": {
    "username": <YOUR_DB_USERNAME>,
    "password": "<YOUR_DB_PASSWORD>,
    "database": <DATABASE_NAME>,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
- Once you've added database config as listed  above, go to the `src` folder from your terminal and execute `npx sequelize db:create` it create database for you also  run `npx sequelize db:migrate`

- Please find postman dump in root directory to test the APIs `GroceryApp.postman_collection`

## DB Design
- Groceries Table
    - id
    - name
    - stock
    - category
    - price

- Users Table
    - Id
    - name
    - email
    - password
    - role

- Orders Table
    - id
    - user_id
    - order_date
    - total_price
    - address
    - status

- Order_Items Table
    - id
    - order_id
    - grocery_id
    - price_per_unit
    - total_price
    - quantity

- A single `User` can place multiple `Orders`, but an `order` belongs to one `user`.
- An `order` can consist of multiple `grocery items`, but each `order item` belongs to exactly one order.