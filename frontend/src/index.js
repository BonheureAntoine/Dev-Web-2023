import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';

import {Auth0ProviderWithNavigate} from "./components/auth0/ auth0-provider-with-navigate";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Auth0ProviderWithNavigate>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Auth0ProviderWithNavigate>
    </BrowserRouter>
);