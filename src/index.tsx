import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import { axiosProperties } from './properties'
import AppRouter from './components/layouts/Router/AppRouter';
import './fonts.css'


//startup configs
axios.defaults.baseURL = axiosProperties.routes.base;


ReactDOM.render(
  <React.StrictMode>
      <AppRouter/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
