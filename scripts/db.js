import mysql from 'mysql2/promise';
import dotenv from "dotenv";

/*
dotenv.config({
    path: "../../.env",
    quiet: true
});
*/

console.log("o", process.env.DB_KEY);
const db = mysql.createPool({
      host: "mysql.railway.internal",
      user: "root",
      password: "lEaCVStCnmnVZVLYkBkgTwTXvmNYmLcV",
      database:  "railway",
      port: 3306
    });
export default db;

