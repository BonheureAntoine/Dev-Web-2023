import React, {useEffect, useState} from 'react';
import '../css/Abonnement.css';

const Abonnement = () => {
    const [user, setUser] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const fetchUserData = () => {
        fetch("http://localhost:3001/api/abonnement/user/1")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUser(data[0])
                setIsLoaded(true)
            })
    }

    useEffect(()=>{
        fetchUserData();
    },[])

    if(isLoaded){
        console.log(user)
        return (
            <div className={"top-container"}>
                <div className={"top-left"}>
                    <Profile name={user.name} familyName={user.familyName} url={user.profilePicture}/>
                </div>
                <div className={"top-right"}>
                    <CreditState lessonCredits={user.lessonCredits} reservedLessons={user.reservedLessons}/>
                    <CreditOp riderId={user.userId} changeState={fetchUserData}/>
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
                    <p>unavaible</p>
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
    const riderId = props.riderId;
    const changeState = props.changeState

    const handleSubmit = event => {
        event.preventDefault();

        const formFields = event.target.elements;

        fetch("http://localhost:3001/api/abonnement/operation", {
            method: "POST",
            body: JSON.stringify({
                riderId: +formFields.riderId.value,
                comment: formFields.comment.value,
                operation: +formFields.op.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => {
            changeState();
        });
            // .then((response) => response.json())
            // .then((json) => console.log(json));

    }
    return (
        <div>
            <form id={"operationForm"} onSubmit={handleSubmit} method={"post"}>
                <input type={"hidden"} name={"riderId"} value={riderId}/>
                <label>Operation :</label>
                <input type={"number"} id={"op"} size={"2"}/><br/>
                <label>Commentaire :</label><br/>
                <input type={"textarea"} id={"comment"}/>
                <input type={"submit"}/>
            </form>
        </div>
    )
}

export default Abonnement;