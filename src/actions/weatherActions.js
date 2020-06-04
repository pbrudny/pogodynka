import * as types from './actionTypes';
import { getCityWeather } from '../api/weatherApi';

export function loadCityWeatherSuccess(city, cityWeather) {
  return {
    type: types.LOAD_CITY_WEATHER_SUCCESS,
    city,
    cityWeather
  };
}

export function loadCityWeather(city) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return getCityWeather(city).then(cityWeather => {
      dispatch(loadCityWeatherSuccess(city, cityWeather));
    }).catch(error => {
      throw(error);
    });
  };
}
