import React from 'react';
import Headers from './Header.js';
import Nav from './Nav.js';
import Footer from './Footer.js';
import './css/App.css'

//import ReactDOM from 'react-dom/client';

class App extends React.Component{
    render(){
        return (
            <div id='App'>
                <Headers/>
                <Nav/>
                <Footer/>
            </div>
        ) ;
    }
}
export default App;