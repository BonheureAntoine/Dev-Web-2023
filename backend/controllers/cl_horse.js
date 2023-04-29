const pool = require('../db');

exports.coat = (req, res, next) => {
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

exports.breed = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("CALL breedOptions()")
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

exports.breeder = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("CALL breederOptions()")
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