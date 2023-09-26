import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Web3Provider from "./providers/web3";

// ** Import Providers
import MaterialThemeProvider from "./providers/theme";

ReactDOM.render(
    <React.StrictMode>
        <MaterialThemeProvider>
            <Web3Provider>
                <App />
            </Web3Provider>
        </MaterialThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);