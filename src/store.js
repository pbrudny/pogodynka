import weatherReducer from './features/weather/weatherReducer';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    weatherReducer,
    applyMiddleware(thunk)
  );
}