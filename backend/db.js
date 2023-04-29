const mariadb = require('mariadb');
require('dotenv').config({path :'.env-local'});

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    connectionLimit: 5
});

// async function asyncFunction() {
//     let conn;
//     try {
//         conn = await pool.getConnection();
//         const rows = await conn.query("SELECT 1 as val");
//         console.log(rows); //[ {val: 1}, meta: ... ]
//
//         const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//         console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//
//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) return conn.end();
//     }
// }
console.log(`connecting to ${process.env.DATABASE} on ${process.env.HOST} as ${process.env.USER}`);

pool.getConnection()
    .then(conn => {
        conn.query("SELECT 1 as val")
            .then((rows) => {
                console.log(rows); //[ {val: 1}, meta: ... ]
                console.log('Connected to database');
            })
            .catch(err => {
                //handle error
                console.log(err);
                conn.end();
            })

    }).catch(err => {
    //not connected
});


module.exports = pool;