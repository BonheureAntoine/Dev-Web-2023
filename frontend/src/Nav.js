import React from "react";
import { Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Chevaux from './components/Chevaux';
import Calendrier from './components/Calendrier.js';
import Abonnement from "./components/Abonnement";

import './css/Nav.css'
import {AuthenticationGuard} from "./components/auth0/authentication-guard";
import {useAuth0} from "@auth0/auth0-react";
import {Error403} from "./components/auth0/error403";
import AuthorizeUser from "./components/auth0/AuthorizeUser";

// class Nav extends React.Component{
//     render(){
//         return(
//             <div id ='nav-bar'>
//                 <nav id='App-nav'>
//                 <ul id="ul-nav">
//                     <li className="nav"><Link to='/' className="acceuil">Acceuil</Link></li>
//                     <li className="nav"><Link to='/calendrier' className="calendrier">Calendrier</Link></li>
//                     <li className="nav"><Link to='/chevaux' className="chevaux">Chevaux</Link></li>
//                     <li className="nav"><Link to='/abonnement' className="abonnement">Abonnement</Link></li>
//                 </ul>
//                 </nav>
//                 <Routes>
//                     <Route exact path="/" element={<Home />} />
//                     <Route path="/calendrier" element={<Calendrier/>} />
//                     <Route path="/chevaux" element={<Chevaux />} />
//                     <Route path="/abonnement" element={<AuthenticationGuard component={Abonnement}/>} />
//                 </Routes>
//             </div>
//         )
//     }
// }

const Nav = () => {
    const { user, isAuthenticated } = useAuth0();

    return(
                <div id ='nav-bar'>
                    <nav id='App-nav'>
                    <ul id="ul-nav">
                        <li className="nav"><Link to='/' className="acceuil">Acceuil</Link></li>
                        <li className="nav"><Link to='/calendrier' className="calendrier">Calendrier</Link></li>
                        <li className="nav"><Link to='/chevaux' className="chevaux">Chevaux</Link></li>
                        {/*{ isAuthenticated &&*/}
                        {/*user['http://localhost:3000/roles'].includes('equiadmin') &&*/}
                        {/*(<li className="nav"><Link to='/abonnement' className="abonnement">Abonnement</Link></li>)}*/}
                        <AuthorizeUser userRole={'equiadmin'}
                                       component={<li className="nav"><Link to='/abonnement' className="abonnement">Abonnement</Link></li>}
                                       />
                    </ul>
                    </nav>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/calendrier" element={<Calendrier/>} />
                        <Route path="/chevaux" element={<AuthenticationGuard component={Chevaux}/>} />
                        <Route path="/abonnement" element={<Abonnement/>}/>
                        <Route path={"/notAuthorized"} element={<Error403/>}/>
                    </Routes>
                </div>
    )
}

export default Nav;

