const pool = require('../db');

exports.user = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("CALL coatOptions()")
                .then(rows => {
                    console.log(rows);
                    res.status(200).json(rows[0]);
                })
                .catch(err => {
                        res.status(400).json({err});
                    }
                )
        })
        .catch(err => {
            res.status(400).json({err});
        })
}

exports.log = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("CALL coatOptions()")
                .then(rows => {
                    console.log(rows);
                    res.status(200).json(rows[0]);
                })
                .catch(err => {
                        res.status(400).json({err});
                    }
                )
        })
        .catch(err => {
            res.status(400).json({err});
        })
}

exports.operation = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query(`CALL operation(${req.body.id});`)
                .then(rows => {
                    console.log(rows);
                    res.status(200).json(rows[0]);
                })
                .catch(err => {
                        res.status(400).json({err});
                    }
                )
        })
        .catch(err => {
            res.status(400).json({err});
        })
}