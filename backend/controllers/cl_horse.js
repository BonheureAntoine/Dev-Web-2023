const pool = require('../db');

exports.options = (req, res) => {
    pool.getConnection()
        .then(conn => {
            conn.query("CALL formOptions()")
                .then(rows => {
                    console.log("Calling  formOptions");
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

exports.addHorse = (req, res) => {

    function dataVerfication() {
        let errormsg = [];
        if (typeof req.body.photo !== "string" && req.body.photo !== null) { //Verif Photo
            errormsg.push("Le format de la photo est invalide")
        }
        if (typeof req.body.birthdate !== "string" || isNaN(new Date(req.body.birthdate).getTime())) { //Verif Date
            errormsg.push("Le format de la date est invalide")
        } else if (new Date(req.body.birthdate) > new Date()) {
            errormsg.push("Date invalide: La date de naissance du cheval ne peut pas être dans le futur")
        } else {
            req.body.birthdate = new Date(req.body.birthdate).toISOString().slice(0, 19).replace('T', ' ')
        }
        if (typeof req.body.hname !== "string") { //Verif name
            errormsg.push("Le format du nom est invalide")
        } else if (req.body.hname.length > 100 || req.body.hname.length < 1) {
            errormsg.push("Nom invalide: Le nom du cheval doit contenir entre 1 et 100 caractères")
        }
        if (!Number.isInteger(req.body.height)) { //Verif height
            errormsg.push("Le format de la taille est invalide")
        } else if (req.body.height > 300) {
            errormsg.push("Taille invalide: La taille du cheval ne peux pas dépasser 300 cm")
        }
        if (typeof req.body.comment !== "string") { //Verif comment
            errormsg.push("Le format du commentaire est invalide")
        } else if (req.body.comment.length > 500000) {
            errormsg.push("Commentaire invalide: Le commentaire ne peut pas dépasser 500000 caractères")
        }
        if (!Number.isInteger(req.body.breed) && req.body.breed !== null) { //Verif breed
            errormsg.push("Le format de la race est invalide")
        }
        if (!Number.isInteger(req.body.coat) && req.body.coat !== null) { //Verif coat
            errormsg.push("La format de la robe est invalide")
        }
        if (!Number.isInteger(req.body.breeder) && req.body.breeder !== null) { //Verif breeder
            errormsg.push("La format de l'éleveur est invalide")
        }
        if (typeof req.body.statut !== "string" || !["elevage", "competition", "manege", "autre"].includes(req.body.statut)) { //Verif statut
            errormsg.push("La valeur/format du statut est invalide")
        }
        if (typeof req.body.gender !== "string" || !["male", "female"].includes(req.body.gender)) {
            errormsg.push("La valeur/format du sexe est invalide")
        }
        if (!errormsg.length > 0) {
            return true
        } else {
            res.status(200).json({errormsg});
            return false
        }
    }

    if (dataVerfication()) {
        pool.getConnection()
            .then(conn => {
                conn.query(`CALL newHorse(?,?,?,?,?,?,?,?,?,?);`, [req.body.hname, req.body.photo, req.body.gender, req.body.birthdate, req.body.breed, req.body.height, req.body.statut, req.body.comment, req.body.breeder, req.body.coat])
                    .then(() => {
                        console.log("Calling  newHorse");
                        res.status(200).json(200);
                    })
                    .catch(err => {
                            console.log(err);
                            res.status(400).json({err});
                        }
                    )
                conn.release();
            })
            .catch(err => {
                res.status(400).json({err});
            })
    }
}
