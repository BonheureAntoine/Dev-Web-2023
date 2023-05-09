import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import './css/App.css'
import Nav from "./Nav";

//import ReactDOM from 'react-dom/client';

class App extends React.Component{
    render(){
        return (
            <div id='App'>
                <Header/>
                <Nav/>
                <Footer/>
            </div>
        ) ;
    }
}

export default App;