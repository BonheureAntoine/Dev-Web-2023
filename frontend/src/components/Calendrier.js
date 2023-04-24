//import  React  from 'react' ; 
//import Calendar from 'react-calendar';



import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";


import "react-big-calendar/lib/css/react-big-calendar.css";
import '../css/Calendrier.css'


const localizer = momentLocalizer(moment);



class Calendrier extends React.Component{
  constructor(props){
    super(props);
    this.events =[
        {
          start: moment().toDate(),
          end: moment()
            .add(1, "hours")
            .toDate(),
          title:<div className="Cours1">
            <div className="title">Cours de saut</div>
            <div className="prof">Prof: Bonheure Nicolas</div>
            <div className="niveau">Level: Avancé</div>
          </div>
        },
        {
          start: new Date('2023-04-24T13:00:00.000Z'),
          end: new Date('2023-04-24T14:00:00.000Z'),
          title: <div className="Cours1">
            <div className="title">Cours de saut</div>
            <div className="prof">Prof: Bonheure Nicolas</div>
            <div className="niveau">Level: Avancé</div>
          </div> 
        }
    ];
    this.state={
      date: new Date(),
    }
  }

    render(){
        return <div>
        <Calendar
          localizer={localizer}
          defaultDate={this.state.date}
          defaultView="week"
          events={this.events}  
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={this.eventPropGetter}
          min={new Date().setHours(8,0,0)}
          max={new Date().setHours(22,0,0)}
        />
        <div>

        </div>
        </div>
        
    }
}

export default Calendrier;
