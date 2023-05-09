const mariadb = require('mariadb');
require('dotenv').config({path :'.env-local'});

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    connectionLimit: 10
});

console.log(`connecting to ${process.env.DATABASE} on ${process.env.HOST} as ${process.env.USER}`);

pool.getConnection()
    .then(conn => {
        conn.query("SELECT 1 as val")
            .then((rows) => {
                console.log('Connected to database');
            })
            .catch(err => {
                //handle error
                console.log(err);
                conn.end();
            })

        conn.release()
    }).catch(err => {
    //not connected
});


module.exports = pool;