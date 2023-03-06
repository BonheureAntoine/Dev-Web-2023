const pool = require('../db');

exports.getUserPayments = (req, res, next) => {
    /**
     * Ici on a toutes les requetes /api/payment
     * Dans celle ci (getUserPayments) on a une requete GET
     */
    pool.getConnection()
        .then(conn => {
            conn.query("select * from payments where idRider = ?",
                [req.params.userId])
                .then(rows => {
                    res.status(200).json(rows);
                    /**
                     * Si réponse sucess revoie le json
                     */
                })
                .catch(err => {
                        res.status(400).json({err});
                    /**
                     * Si erreur revoie un json avec l'erreur
                     */
                    }
                )

        })
        .catch(err => {
            res.status(400).json({err});
            /**
             * Similaire à celui du dessus
             */
        })
}

exports.createUserPayment = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("insert into payments (id, idRider, paymentDate) values (?, ?, ?)",
                [req.params.userId, req.body.payId, req.body.payDate])
                .then(rows => {
                    res.status(201).json({message: 'Payment created'});
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


exports.updateUserPayment = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("update payments set idRider = ?, paymentDate = ? where id = ?",
                [req.params.userId, req.body.payId, req.body.payDate])
                .then(rows => {
                    res.status(200).json({message: 'Payment updated'});
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


exports.deleteUserPayment = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("delete from payments where id = ?",
                [req.params.paymentId])
                .then(rows => {
                    res.status(200).json({message: 'Payment deleted'});
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
