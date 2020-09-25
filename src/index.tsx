import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import ComicsPage from './pages/comics'
import * as serviceWorker from './serviceWorker';
import { axiosProperties } from './properties'


//startup configs
axios.defaults.baseURL = axiosProperties.routes.base;


ReactDOM.render(
  <React.StrictMode>
    <ComicsPage/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
