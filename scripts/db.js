import mysql from 'mysql2/promise';
import dotenv from "dotenv";

/*
dotenv.config({
    path: "../../.env",
    quiet: true
});
*/

console.log("o", process.env.MYSQLHOST);
const db = mysql.createPool({
      host: process.env.MYSQLHOST,
      user: "root",
      password: "lEaCVStCnmnVZVLYkBkgTwTXvmNYmLcV",
      database:  "railway",
      port: 3306
    });
export default db;

