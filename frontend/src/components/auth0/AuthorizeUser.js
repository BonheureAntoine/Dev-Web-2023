import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthorizeUser = (props) => {
    const {user, isAuthenticated} = useAuth0();

    const Component = () =>{return props.component}

    const userRole = props.userRole;
    if(isAuthenticated){
        if (user['http://localhost:3000/roles'].includes(userRole)){
            return <Component/>;}
    }else{
        return ""
    }
}

export default AuthorizeUser;