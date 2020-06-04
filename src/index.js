import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import history from './history';
import weather from "openweather-apis";
import configureStore from "./store";

const store = configureStore();
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

weather.setLang('pl');
weather.setAPPID(API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
