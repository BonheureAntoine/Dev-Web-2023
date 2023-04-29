import React from "react";
import logo from './img/logo.png'
import './css/Header.css'
import LoginButton from "./components/LoginButton";

class Header extends React.Component{
    render(){
        return(
            <div id ='App-header'>
                <a href='http://localhost:3000/'><img src={logo} alt='logo' className="logo"></img></a>
                <div className="nameEnterprise" >EquiManagement</div>
                <LoginButton/>
            </div>
        )
    }
}

export default Header;