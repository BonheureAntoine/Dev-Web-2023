import React, {useEffect, useState} from 'react';
import '../css/Abonnement.css';

const displayedUser=1;

const Abonnement = () => {
    const [user, setUser] = useState([])
    const [userIsLoaded, setUserIsLoaded] = useState(false)

    const [logs, setLogs] = useState([])
    const [logsIsLoaded, setLogsIsLoaded] = useState(false)

    const fetchUserData = () => {
        fetch(`http://localhost:3001/api/abonnement/user/${displayedUser}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUser(data[0])
                setUserIsLoaded(true)
            })
    }

    const fetchLogsData = () => {
        fetch(`http://localhost:3001/api/abonnement/logs/${displayedUser}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                setLogs(data)
                setLogsIsLoaded(true)
            })
    }

    useEffect(()=>{
        fetchUserData();
        fetchLogsData();
    },[])

    if(userIsLoaded && logsIsLoaded){
        {/*console.log(user)*/}
        return (
            <div className={"abonnement"}>
                <div className={"top-container"}>
                    <Profile name={user.name} familyName={user.familyName} url={user.profilePicture} className={"top-div"}/>
                    <CreditState lessonCredits={user.lessonCredits} reservedLessons={user.reservedLessons} className={"top-div"}/>
                    <CreditOp riderId={user.userId} changeState={fetchUserData} className={"top-div"}/>
                </div>
                <hr/>
                <Log logs={logs}/>
            </div>
        );
    }else{
        return(
            <div className={"abonnement"}>
                <div className={"top-container"}>
                    <div className={"top-left"}>
                        <Profile name={"loading"} familyName={"..."} url={"profile.png"}/>
                    </div>
                    <div className={"top-right"}>
                        <p>unavaible</p>
                    </div>
                </div>
                <hr/>
            </div>
        )
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
        formFields.operation.value = 0;
        formFields.comment.value = "";
            // .then((response) => response.json())
            {/*// .then((json) => console.log(json));*/}
    }
    return (
        <div>
            <form id={"operationForm"} onSubmit={handleSubmit} method={"post"}>
                <input type={"hidden"} name={"riderId"} value={riderId}/>
                <label>Operation :</label>
                <input type={"number"} id={"op"} size={"2"}/><br/>
                <label>Commentaire :</label><br/>
                <textarea id={"comment"} cols={"50"} rows={"5"}/><br/>
                <input type={"submit"}/>
            </form>
        </div>
    )
}

const Log = (props) => {
    const logs = Array.from(props.logs);

    return(
        <table>
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Operation</th>
                    <th>Comentaire</th>
                </tr>
            </thead>
            <tbody>
                {logs.map((log) => (
                    <tr><td>{log.opDate}</td><td>{log.operation}</td><td>{log.comment}</td></tr>
                    ))}
            </tbody>
        </table>
    )
}

export default Abonnement;