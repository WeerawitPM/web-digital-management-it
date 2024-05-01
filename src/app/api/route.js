import db_connect from './db_connect';

export async function GET() {
    return new Promise((resolve, reject) => {
        db_connect.query('SELECT * FROM admin', (err, rows) => {
            if (err) {
                console.log('Error in the query');
                reject(err); // Reject the promise with the error
                return;
            }
            resolve(Response.json(rows)); // Resolve the promise with the response
        });
    });
};
