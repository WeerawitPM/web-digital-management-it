const mysql = require('mysql2');

const db_connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
});

db_connect.connect((err) => {
    if (err) {
        console.log('Error connecting to the MySQL server.');
        return;
    }
    console.log('Connected to the MySQL server.');
});

module.exports = db_connect;
