import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
// import Chevaux from './components/HorseList';
import Calendrier from './components/Calendrier.js';
import Abonnement from "./components/Abonnement";
import Header from "./Header";
import Footer from "./Footer";
import Test from "./components/test";
import './css/App.css'

//import ReactDOM from 'react-dom/client';

class App extends React.Component{
    render(){
        return (
            <div id='App'>
                <Header/>
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
                        {/* <Route path="/chevaux" element={<Chevaux />} /> */}
                        <Route path="/abonnement" element={<Abonnement />} />
                        <Route path="/Test" element={<Test />} />

                    </Routes>
                </div>
                <Footer/>
            </div>
        ) ;
    }
}

export default App;