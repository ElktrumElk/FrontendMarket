import mysql from 'mysql2/promise';
import dotenv from "dotenv";

/*
dotenv.config({
    path: "../../.env",
    quiet: true
});
*/

console.log("o", process.env.DB_KEY);
export const db = mysql.createPool({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT,
    });

export default db;