import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';

import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider domain={"dev-nlsmejlnkpumpmbb.eu.auth0.com"} clientId={"geYji3g7wIIjNHNS6J7QrQSJX5h5gUTJ"}>
    <React.StrictMode>
    <App />
    </React.StrictMode>
    </Auth0Provider>
);