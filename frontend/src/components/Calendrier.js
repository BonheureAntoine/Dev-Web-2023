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
      evenementobjet["title"] = <div className={evenement.title}><div className="title">{evenement.title}</div>
      <div className="prof">Prof: {evenement.prof}</div><div className="niveau">Level:{evenement.level}</div></div>;
      evenementsArray.push(evenementobjet);

  }
  return(evenementsArray)
}

// const test = JSON.stringify([
//   {
//       startDate: "2023-04-24T13:00:00.000Z",
//       endDate:"2023-04-24T14:00:00.000Z",
//       title: "Cours de saut",
//       level: "Avancé",
//       teacher:"PAPA"
//   },{
//       startDate: "2023-04-25T13:00:00.000Z",
//       endDate:"2023-04-25T15:00:00.000Z",
//       title: "Cours de saut",
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
// ])


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
    fetch("http://localhost:3000/api/evenements")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("There has been a problem with your fetch operation")
        })
        .then(data => {
          this.setState({event : data})
        }).catch((error) => {
        console.log('error: ' + error);
    });
  }

    render(){
      // const { fetchEvenements, event } = this.state;
      //   if (!fetchEvenements) return <div>
      //       <h1> Pleses wait some time.... </h1> </div> ;
        
        return <div>
        <Calendar
          localizer={localizer}
          defaultDate={this.state.date}
          defaultView="week"
          events={formatageJsonEvenement(this.state.event)}
          //events={this.state.event}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={this.eventPropGetter}
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
        />
        <div>

        </div>
        </div>
        
    }
}

export default Calendrier;
