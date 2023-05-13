const pool = require('../db');

exports.evenement = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("CALL allEvent()")
                .then(rows => {
                    console.log("Call _allEvent")
                    res.status(200).json(rows[0]);
                })
                .catch(err => {
                    res.status(400).json({err});
                })
            conn.release()
        })
        .catch(err => {
            res.status(400).json({err});
        })
}
