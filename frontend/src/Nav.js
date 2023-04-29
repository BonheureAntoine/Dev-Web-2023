import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Chevaux from './components/Chevaux';
import Calendrier from './components/Calendrier.js';
import Abonnement from "./components/Abonnement";

import './css/Nav.css'

class Nav extends React.Component{
    render(){
        return(
        <BrowserRouter>
            <div id ='nav-bar'>
                <nav id='App-nav'>
                <ul id="ul-nav">
                    <li className="nav"><Link to='/' className="acceuil">Acceuil</Link></li>
                    <li className="nav"><Link to='/calendrier' className="calendrier">Calendrier</Link></li>
                    <li className="nav"><Link to='/chevaux' className="chevaux">Chevaux</Link></li>
                    <li className="nav"><Link to='/abonnement' className="abonnement">Abonnement</Link></li>
                </ul>
                </nav>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/calendrier" element={<Calendrier/>} />
                    <Route path="/chevaux" element={<Chevaux />} />
                    <Route path="/abonnement" element={<Abonnement />} />
                </Routes>
            </div>
        </BrowserRouter>
        )
    }
}

export default Nav;

