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
      host: "maglev.proxy.rlwy.net",
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: 25448,
    });
export default db;

