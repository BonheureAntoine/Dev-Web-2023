import horseHeadImage from '../img/horse_head.png';
import React, {Component} from 'react';
import '../css/Chevaux.css'


class Chevaux extends Component {
    render() {
        return (
            <HorseList></HorseList>
        );
    }
}

function Horse(horse) {
    return (
        <div className="horsePreview">
            <div className="pic">
                <img
                    src={horse.picture || horseHeadImage}
                    className="horsePic"
                    alt="Horse Picture"
                />
            </div>
            <div className="infos">
                <div className="name">{horse.name}</div>
                <div className="status">{horse.status}</div>
                <div className="gender">{horse._gender}</div>
            </div>
        </div>
    )
}



class HorseList extends Component {
    constructor() {
        super();
        this.state = {
            horseList: []
        }
    }

    componentDidMount() {
        fetch("https://equimanagmentapi.vercel.app/api/horse/")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("There has been a problem with your fetch operation")
            })
            .then(data => {
                //console.log(data);
                this.setState({horseList: data})
            }).catch((error) => {
            console.log('error: ' + error);
        });
    }

    render() {
        return (
            <div className="horseList">
                {this.state.horseList.map((horse, index) => (<Horse
                    name={horse.name}
                    _gender={horse.gender}
                    status={horse.status}
                    picture={horse.picture}
                    link={horse.name.replace(/ +/g, "-")}>
                </Horse>))}
            </div>
        )
    }
}

export default Chevaux;