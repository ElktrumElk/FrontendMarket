import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'my pass',
    database: 'frontendUsers'
});

export default db;