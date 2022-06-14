import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import store from "./Redux/Store";
import {BrowserRouter as Router} from "react-router-dom";
import {CookiesProvider} from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
    <CookiesProvider>
      <App/>
    </CookiesProvider>
    </Provider>

    </Router>
  
    
  </React.StrictMode>,
  document.getElementById('root')
);


