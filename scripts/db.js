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
      host: "mysql-production-935c.up.railway.app",
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE
    });
export default db;

