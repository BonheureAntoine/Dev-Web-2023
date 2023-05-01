import React, {useEffect, useState} from 'react';
import '../css/Abonnement.css';

const Abonnement = () => {
    const [rider, setRider] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const fetchUserData = () => {
        fetch("http://localhost:3001/api/abonnement/user/2")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setRider(data[0])
                setIsLoaded(true)
            })
    }

    useEffect(()=>{
        fetchUserData()
    },[])

    if(isLoaded){
        return (
            <div className={"top-container"}>
                <div className={"top-left"}>
                    <Profile name={rider.name} familyName={rider.familyName} url={rider.profilePicture}/>
                </div>
                <div class={"top-right"}>
                    <CreditState lessonCredits={rider.lessonCredits} reservedLessons={rider.reservedLessons}/>
                    <CreditOp/>
                </div>
            </div>
        );
    }else{
        return(
            <div className={"top-container"}>
                <div className={"top-left"}>
                    <Profile name={"loading"} familyName={"..."} url={"profile.png"}/>
                </div>
                <div className={"top-right"}>
                    <CreditState lessonCredits={"/"} reservedLessons={"/"}/>
                    <CreditOp/>
                </div>
            </div>)
    }
}

const Profile = (props) => {
    const name = props.name;
    const familyName = props.familyName;
    const picUrl = props.url;

    return (
        <div>
            <img className="profile-pic" src={picUrl}/>
            <p>{name} {familyName}</p>
        </div>
    )
}

const CreditState = (props) => {
    const lessonCredits = props.lessonCredits;
    const reservedLessons = props.reservedLessons;

    return (
        <div>
            <p>Nombre de credit de cours : <span>{lessonCredits}</span></p>
            <p>Nombre de cours reserver : <span>{reservedLessons}</span></p>
        </div>
    )

}

const CreditOp = (props) => {
    return (
        <div>
            <form id={"operationForm"}>
                <label for={"op"}>Operation :</label>
                <input type={"number"} id={"op"} size={"2"}/><br/>
                <label for={"comment"}>Commentaire :</label><br/>
                <input type={"textarea"} id={"comment"}/>
            </form>
        </div>
    )
}

export default Abonnement;