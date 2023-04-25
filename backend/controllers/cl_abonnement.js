const pool = require('../db');

exports.user = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query(`CALL getUserInfo(${req.params.id});`)
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
            conn.query(`CALL getLogs(${req.params.id});`)
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
            console.log(req.body);
            conn.query(`CALL creditOperation(${req.body.riderId}, ${req.body.operation}, "${req.body.comment}");`)
                .then(rows => {
                    res.status(200).json();
                })
                .catch(err => {
                        console.log(err);
                        res.status(400).json({err});
                    }
                )
        })
        .catch(err => {
            res.status(400).json({err});
        })
}