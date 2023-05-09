import React, {useEffect, useState} from 'react';
import parse from 'html-react-parser'
import '../css/AddHorse.css'

let id = window.location.pathname.split("/")[2].split(":")[0];
console.log(id)

const AddHorse = () => {
    const [fetchData, setfetchData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [formData] = useState({
        photo: null,
        hname: "",
        gender: "male",
        birthdate: "",
        breed: null,
        breeder: null,
        coat: null,
        height: "",
        statut: "elev",
        comment: "",
    });
    const fetchOptions = () => {
        fetch("http://localhost:3001/api/horse/getHorseOptn/:"+id)
        .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("There has been a problem with your fetch operation")
            })
            .then(data => {
                setfetchData([data]);
                setIsLoaded(true)
            }).catch((error) => {
            console.log('error: ' + error);
        });
    }

    useEffect(() => {
        fetchOptions()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const formFields = event.target.elements;
        if (formFields.photo.files[0] !== undefined) {
            formData.photo = formFields.photo.files[0].name
        }
        formData.hname = formFields.hname.value
        formData.gender = formFields.gender.value
        formData.birthdate = formFields.birthdate.value
        formData.breed = Number(formFields.breed.value)
        if (formFields.breeder.value !== "null") {
            formData.breeder = Number(formFields.breeder.value)
        } else {
            formData.breeder = null
        }
        formData.coat = Number(formFields.coat.value)
        formData.height = Number(formFields.height.value)
        formData.statut = formFields.statut.value
        formData.comment = formFields.comment.value
        fetch("http://localhost:3001/api/horse/addHorse", {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(res => {
            if (res === 200) {
                successDisplay()
            } else {
                errorDisplay(res.errormsg)
            }
        })
    }

    const errorDisplay = (errormsg) => {
        let txt = ""
        for (let i in errormsg) {
            txt += errormsg[i] + "\n"
        }
        document.getElementById("errordisplay").innerText = txt
        document.getElementById("errordisplay").style.backgroundColor = "rgba(220,101,101,0.68)"
    }
    const successDisplay = () => {
        document.getElementById("button").style.display = "none"
        document.getElementById("successdisplay").innerText = "Cheval ajouté avec succès à la base de données"
        document.getElementById("successdisplay").style.backgroundColor = "rgba(149, 203, 148, 0.68)"
    }

    if (isLoaded) {
        return (
            <form onSubmit={handleSubmit}>
                <FormTop/>
                <div className={"right"}>
                    <div className={"field"}>
                        <label htmlFor="breed">Race: *<br/></label>
                        <select id="breed" name="breed" required>
                            <OptionsDisplay data={fetchData} opt={"breed"}/>
                        </select>
                    </div>
                    <div className={"field"}>
                        <label htmlFor="breeder">Eleveur:<br/></label>
                        <select id="breeder" name="breeder">
                            <option value={"null"} selected="selected">Aucun</option>
                            <OptionsDisplay data={fetchData} opt={"breeder"}/>
                        </select>
                    </div>
                    <div className={"field"}>
                        <label htmlFor="coat">Robe: *<br/></label>
                        <select id="coat" name="coat" required>
                            <OptionsDisplay data={fetchData} opt={"coat"}/>
                        </select>
                    </div>
                    <FormBot/>
                    <div className={"blockbtn"}>
                        <p>* Champs Obligatoires</p>
                        <button id="button" className={"btn"} type="submit">Ajouter</button>
                    </div>
                    <div id="successdisplay">
                    </div>
                </div>
            </form>
        );
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <FormTop/>
                <div className={"right"}>
                    <div className={"field"}>
                        <label htmlFor="breed">Race: *<br/></label>
                        <select id="breed" name="breed" required>
                            <option value={"none"}>Chargement...</option>
                        </select>
                    </div>
                    <div className={"field"}>
                        <label htmlFor="breeder">Eleveur:<br/></label>
                        <select id="breeder" name="breeder">
                            <option value={"none"}>Chargement...</option>
                        </select>
                    </div>
                    <div className={"field"}>
                        <label htmlFor="coat">Robe: *<br/></label>
                        <select id="coat" name="coat" required>
                            <option value={"none"}>Chargement...</option>
                        </select>
                    </div>
                    <FormBot/>
                    <div className={"blockbtn"}>
                        <p>* Champs Obligatoires</p>
                        <button id="button" className={"btn"} type="submit">Ajouter</button>
                    </div>
                    <div id="successdisplay">
                    </div>
                </div>
            </form>
        );
    }
}

const FormTop = () => {
    return (
        <div className={"left"}>
            <div className={"field"}>
                <label htmlFor="photo">Photo: (png ou jpg)<br/></label>
                <input id="photo" name="photo" type="file"/>
            </div>
            <div className={"field"}>
                <label htmlFor="hname">Nom: *<br></br></label>
                <input id="hname" name="hname" type="text" required/>
            </div>
            <div className={"field"}>
                <label>Sexe*:<br></br>
                    <label htmlFor="male">M</label>
                    <input id="male" name="gender" type="radio" value="male" required/>
                    <label htmlFor="female">F</label>
                    <input id="female" name="gender" type="radio" value="female"/>
                </label>
            </div>
            <div className={"field"}>
                <label htmlFor="birth">Date de naissance: *<br/></label>
                <input id="birth" name="birthdate" type="date" required/>
            </div>
            <div className={"field"}>
                <label htmlFor="comment">Besoins médicaux / Commentaire<br/></label>
                <textarea id="comment" name="comment" rows="4" cols="50"/>
            </div>
            <div id="errordisplay">
            </div>
        </div>
    );
}

const FormBot = () => {
    return (
        <div>
            <div className={"field"}>
                <label htmlFor="height">Hauteur(cm): *<br/></label>
                <input id="height" name="height" type="number" required/>
            </div>
            <div className={"field"}>
                <label htmlFor="statut">Statut: *<br/></label>
                <select id="statut" name="statut" required>
                    <option value="elevage">Élevage</option>
                    <option value="competition">Competition</option>
                    <option value="manege">Manege</option>
                    <option value="autre">Autre</option>
                </select>
            </div>
        </div>
    );
}

const OptionsDisplay = (props) => {
    let html = ""
    if (props.data[0] !== undefined) {
        for (let i in Object.keys(props.data[0])) {
            if (props.data[0][i].source === props.opt) {
                html += props.data[0][i].option
            }
        }
    }
    return parse(html)
}
export default AddHorse;
