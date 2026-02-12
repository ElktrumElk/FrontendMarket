import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'EfbjOelktrumelk@1234',
    database: 'frontendUsers'
});

export default db;