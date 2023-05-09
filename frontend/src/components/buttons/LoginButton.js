import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithPopup } = useAuth0();

    return <button onClick={() => loginWithPopup()}>Se connecter</button>;
};

export default LoginButton;