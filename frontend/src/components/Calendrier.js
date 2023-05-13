import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr"


import "react-big-calendar/lib/css/react-big-calendar.css";
import '../css/Calendrier.css'


const localizer = momentLocalizer(moment);

function formatageJsonEvenement(evenementsJson){
  let evenementsArray = [];
  for (let  evenement of evenementsJson){
      let evenementobjet = {};
      evenementobjet["start"] = new Date(evenement.startDate);
      evenementobjet["end"] =  new Date(evenement.endDate);
      evenementobjet["title"] = <div className={evenement.type}><div className="title">{evenement.title? evenement.title : evenement.type}</div>
      <div className="prof">Prof: {evenement.prof}</div><div className="niveau">Level:{evenement.level}</div></div>;
      evenementobjet["type"] = evenement.type;
      evenementsArray.push(evenementobjet);
  }
  return(evenementsArray)
}

// const test = [
//   {
//       startDate: "2023-04-24T13:00:00.000Z",
//       endDate:"2023-04-24T14:00:00.000Z",
//       title: "Cours de saut",
//       level: "Avancé",
//       teacher:"PAPA"
//   },{
//       startDate: "2023-04-25T13:00:00.000Z",
//       endDate:"2023-04-25T15:00:00.000Z",
//       title: "Cours de dressage",
//       level: "Avancé",
//       teacher:"PAPA"
//   },{
//       startDate: "2023-04-26T13:00:00.000Z",
//       endDate:"2023-04-26T16:00:00.000Z",
//       title: "Cours de saut",
//       level: "Avancé",
//       teacher:"PAPA"
//   },{
//       startDate: "2023-04-27T13:00:00.000Z",
//       endDate:"2023-04-27T17:00:00.000Z",
//       title: "Cours de saut",
//       level: "Avancé",
//       teacher:"PAPA"
//   }
// ]


class Calendrier extends React.Component{
  constructor(){
    super();
    this.state={
      date: new Date(),
      event: [],
      getApiData: ""
    }
  }
  
  componentDidMount() {
    fetch("http://localhost:3001/api/evenements")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("There has been a problem with your fetch operation")
        })
        .then(data => {
          this.setState({event : formatageJsonEvenement(data)})
        }).catch((error) => {
        console.log('error: ' + error);
    });
  }


    render(){
        return <div>
        <Calendar
          localizer={localizer}
          defaultDate={this.state.date}
          defaultView="week"
          //events={formatageJsonEvenement(test)}
          events={this.state.event}
          startAccessor="start"
          endAccessor="end"
          //eventPropGetter={this.eventPropGetter}
          min={new Date().setHours(8,0,0)}
          max={new Date().setHours(22,0,0)}
          culture="fr"
          messages = {{
              allDay: "Tous les jours",
              previous: "Précédent",
              next: "Suivant",
              today: "Aujourd'hui",
              month: "Mois",
              week: "Semaine",
              day: "Jour",
              agenda: "Agenda",
              date: "Date",
              time: "Heure",
              event: "Evenement",
          }}
          eventPropGetter={(test1 = this.state.event) => {
            let backgroundColor ="";
            let color = "white";
            switch (test1.type){
                case "Cours de jumping":
                backgroundColor= "green";
                break;
                case "Cours de dressage":
                backgroundColor= "blue";
                break;
                case "Cours western":
                backgroundColor= "orange";
                break;
                case "Cours de cross":
                backgroundColor= "black";
                break;
                case "Concours de jumping":
                backgroundColor= "cyan";
                break;
                case "Concours de dressage":
                backgroundColor= "red";
                break;
                case "Concours complet":
                backgroundColor= "lightblue";
                break;
                case "Pony Games":
                backgroundColor= "lightred";
                break;

              default:
                backgroundColor= "white";
                color = "black";
            }
            return { style: { backgroundColor ,color} }
          }}
        />
        </div>
        
    }
}

export default Calendrier;
