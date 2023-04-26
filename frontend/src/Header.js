import React from "react";
import logo from './img/logo.png'
import './css/Header.css'
import { NavLink} from "react-router-dom";

class Header extends React.Component{
    render(){
        return(
            <div id ='App-header'>
                <NavLink to='/' className="link-logo"><img src={logo} alt='logo' className="logo"></img></NavLink>
                <NavLink to='/' className="link-title"><div className="nameEnterprise" >EquiManagement</div></NavLink>
                <NavLink to='/Test' className="link-connection"><div className="connect">Se connecter</div></NavLink>
            </div>
        )
    }
}

export default Header;