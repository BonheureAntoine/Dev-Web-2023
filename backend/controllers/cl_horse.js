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



exports.getHorses = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("CALL getHorses()")
                .then(rows => {
                    console.log("Calling HorseList");
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

    function dataVerification() {
        let errors = [];

        if (typeof req.body.photo !== "string" && req.body.photo !== null) {
            errors.push({ field: "photo", message: "Le format de la photo est invalide" });
        } else if (typeof req.body.photo === "string" && req.body.photo.length > 500) {
            errors.push({ field: "photo", message: "Photo invalide: Le nom du fichier ne peut pas dépasser 500 caractères" });
        }

        if (typeof req.body.birthdate !== "string" || isNaN(new Date(req.body.birthdate).getTime())) {
            errors.push({ field: "birthdate", message: "Le format de la date est invalide" });
        } else if (new Date(req.body.birthdate) > new Date()) {
            errors.push({ field: "birthdate", message: "Date invalide: La date de naissance du cheval ne peut pas être dans le futur" });
        } else {
            req.body.birthdate = new Date(req.body.birthdate).toISOString().slice(0, 19).replace('T', ' ');
        }

        if (typeof req.body.hname !== "string") {
            errors.push({ field: "hname", message: "Le format du nom est invalide" });
        } else if (req.body.hname.length > 100 || req.body.hname.length < 1) {
            errors.push({ field: "hname", message: "Nom invalide: Le nom du cheval doit contenir entre 1 et 100 caractères" });
        }

        if (!Number.isInteger(req.body.height)) {
            errors.push({ field: "height", message: "Le format de la taille est invalide" });
        } else if (req.body.height > 300 || req.body.height < 0) {
            errors.push({ field: "height", message: "Taille invalide: La taille du cheval ne peut pas dépasser 300 cm ou être négative" });
        }

        if (typeof req.body.comment !== "string") {
            errors.push({ field: "comment", message: "Le format du commentaire est invalide" });
        } else if (req.body.comment.length > 500000) {
            errors.push({ field: "comment", message: "Commentaire invalide: Le commentaire ne peut pas dépasser 500000 caractères" });
        }

        if (!Number.isInteger(req.body.breed) && req.body.breed !== null) {
            errors.push({ field: "breed", message: "Le format de la race est invalide" });
        }

        if (!Number.isInteger(req.body.coat) && req.body.coat !== null) {
            errors.push({ field: "coat", message: "Le format de la robe est invalide" });
        }

        if (!Number.isInteger(req.body.breeder) && req.body.breeder !== null) {
            errors.push({ field: "breeder", message: "Le format de l'éleveur est invalide" });
        }

        if (typeof req.body.statut !== "string" || !["elevage", "competition", "manege", "autre"].includes(req.body.statut)) {
            errors.push({ field: "statut", message: "La valeur/format du statut est invalide" });
        }

        if (typeof req.body.gender !== "string" || !["male", "female"].includes(req.body.gender)) {
            errors.push({ field: "gender", message: "La valeur/format du sexe est invalide" });
        }
        if (errors.length === 0) {
            return true
        } else {
            res.status(422).json({errors});
            return false
        }
    }

    if (dataVerification()) {
        pool.getConnection()
            .then(conn => {
                conn.query(`CALL newHorse(?,?,?,?,?,?,?,?,?,?);`, [req.body.hname, req.body.photo, req.body.gender, req.body.birthdate, req.body.breed, req.body.height, req.body.statut, req.body.comment, req.body.breeder, req.body.coat])
                    .then(() => {
                        console.log("Calling  newHorse");
                        res.status(201).json(201);
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

