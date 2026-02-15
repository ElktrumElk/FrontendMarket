import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config({
    path: "../../.env",
    quiet: true
});


console.log("yo", process.env.DB_KEY);
export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_KEY,
    database: 'frontendUsers'
});

export default db;