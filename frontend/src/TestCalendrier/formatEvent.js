// import React from "react";



const test = JSON.stringify([
    {
        startDate: "2023-04-24T13:00:00.000Z",
        endDate:"2023-04-24T13:00:00.000Z",
        title: "Cours de saut",
        level: "Avancé",
        teacher:"PAPA"
    },{
        startDate: "2023-04-24T13:00:00.000Z",
        endDate:"2023-04-24T13:00:00.000Z",
        title: "Cours de saut",
        level: "Avancé",
        teacher:"PAPA"
    },{
        startDate: "2023-04-24T13:00:00.000Z",
        endDate:"2023-04-24T13:00:00.000Z",
        title: "Cours de saut",
        level: "Avancé",
        teacher:"PAPA"
    },{
        startDate: "2023-04-24T13:00:00.000Z",
        endDate:"2023-04-24T13:00:00.000Z",
        title: "Cours de saut",
        level: "Avancé",
        teacher:"PAPA"
    }
])


function foramtageJsonEvenement(evenementsJson){
    let evenementsArray = [];
    for (let  evenement of JSON.parse(evenementsJson)){
        let evenementobjet = {};
        evenementobjet["start"] = evenement.startDate;
        evenementobjet["end"] = evenement.endDate;
        evenementobjet["title"] = '<div className="Cours1"><div className="title">{evenement.title}</div><div className="prof">Prof: {evenement.teacher}</div><div className="niveau">Level: {evenement.level}</div></div>';
        evenementsArray.push(evenementobjet);

    }
    return(evenementsArray)
}
foramtageJsonEvenement(test)