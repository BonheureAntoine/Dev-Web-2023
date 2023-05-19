const pool = require('../db');

exports.concours = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("CALL getConcours()")
                .then(rows => {
                    res.status(200).json(rows[0]);
                })
                .catch(err => {
                        res.status(400).json({err});
                    }
                )
                conn.release()
        })
        .catch(err => {
            res.status(400).json({err});
        })
}