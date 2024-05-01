// get the client
const mysql = require('mysql2');

export async function GET() {
    // create the connection to database
    const connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
    });

    if (connection) {
        return Response.json({ message: 'Connected to the MySQL server.' });
    } else {
        return Response.json({ message: 'Error connecting to the MySQL server.' });
    }
};