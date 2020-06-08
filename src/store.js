import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import weatherReducer from './features/weather/weatherReducer';

const configureStore = () => {
  return createStore(
    weatherReducer,
    applyMiddleware(thunk),
  );
};

export default configureStore;
