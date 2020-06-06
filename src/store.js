import weatherReducer from './features/weather/weatherReducer';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const configureStore = () => {
  return createStore(
    weatherReducer,
    applyMiddleware(thunk)
  );
};

export default configureStore;