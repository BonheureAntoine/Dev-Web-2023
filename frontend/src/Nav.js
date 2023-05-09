import React from "react";
import { Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
// import Chevaux from './components/HorseList';
import Calendrier from './components/Calendrier.js';
import Abonnement from "./components/Abonnement";
import AddHorse from "./components/AddHorse";

import {AuthenticationGuard} from "./components/auth0/authentication-guard";
import {Error403} from "./components/auth0/error403";
import AuthorizeUser from "./components/auth0/AuthorizeUser";


const Nav = () => {
    return(
            <div id ='nav-bar'>
                <nav id='App-nav'>
                <ul id="ul-nav">
                    <li className="nav"><Link to='/' className="acceuil">Acceuil</Link></li>
                    <li className="nav"><Link to='/calendrier' className="calendrier">Calendrier</Link></li>
                    <li className="nav"><Link to='/addhorse' className="chevaux">Chevaux</Link></li>
                    <AuthorizeUser userRole={'equiadmin'} component={<li className="nav"><Link to='/abonnement' className="abonnement">Abonnement</Link></li>}/>
                </ul>
                </nav>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/calendrier" element={<Calendrier/>} />
                    <Route path="/addhorse" element={<AddHorse />} />
                    <Route path="/abonnement" element={<Abonnement/>}/>
                    <Route path={"/notAuthorized"} element={<Error403/>}/>
                </Routes>
            </div>
    )
}

export default Nav;

