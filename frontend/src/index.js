import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EntriesContextProvider } from './context/EntriesContext';
import { AuthContextProvider } from './context/AuthContext';

// STORE -> GLOBALIZED STATE
import { Provider } from 'react-redux';
import configureStore from './store/store';

const store = configureStore();

// ACTION -> NAME OF ACTION

// REDUCER -> DESCRIBES HOW ACTION TURNS INTO THE NEXT STATE

// DISPATCH -> EXECUTES ACTIONS THROUGH REDUCER, UPDATING THE STORE


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <EntriesContextProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </EntriesContextProvider>
    </AuthContextProvider>
);