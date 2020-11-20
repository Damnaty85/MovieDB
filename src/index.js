import React from 'react';
import ReactDOM from 'react-dom';
import "./index.scss";
import Router from "./components/Router";
// import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Router/>, document.getElementById('root'));

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/serviceWorker.js");
    });
}

// serviceWorker.register();
