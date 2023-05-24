import React from "react";
import logo from './img/logo.png'
import './css/Header.css'
import LoginButton from "./components/buttons/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/buttons/LogoutButton";


// class Header extends React.Component{
//     render(){
//         return(
//             <div id ='App-header'>
//                 <a href='http://localhost:3000/'><img src={logo} alt='logo' className="logo"></img></a>
//                 <div className="nameEnterprise" >EquiManagement</div>
//                 {<LoginButton/>}
//             </div>
//         )
//     }
// }

const Header = () => {
    const { isAuthenticated } = useAuth0();

    return(
            <div id ='App-header'>
                <a href='https://equimanagement.vercel.app/'><img src={logo} alt='logo' className="logo"></img></a>
                <div className="nameEnterprise" >EquiManagement</div>
                {!isAuthenticated && (<LoginButton/>)}
                {isAuthenticated && (<LogoutButton/>)}
            </div>
        )
}

export default Header;