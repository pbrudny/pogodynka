import * as types from './actionTypes';
import { getCityWeather } from '../api/weatherApi';
import {mainCities} from "../data/mainCities";

export function loadCityWeatherSuccess(cityWeather) {
  return {
    type: types.LOAD_CITY_WEATHER_SUCCESS,
    cityWeather
  }
}

export function loadMainCitiesWeatherSuccess(mainCitiesWeather) {
  return {
    type: types.LOAD_MAIN_CITIES_WEATHER_SUCCESS,
    mainCitiesWeather
  }
}

export function loadCityWeather(city) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return getCityWeather(city)
      .then(cityWeather => {
      dispatch(loadCityWeatherSuccess(cityWeather));
    }).catch(error => {
      throw(error);
    });
  };
}

export const getMainCitiesWeather = async (city) => {
  const otherCities = mainCities.filter(mainCity => mainCity.toLowerCase() !== city.toLowerCase());
  const citiesWeather = otherCities.slice(0,3).map(otherCity => getCityWeather(otherCity));

  try {
    const response = await Promise.all(citiesWeather);
    return response;
  } catch(error) {
    console.log(error);
    return error;
  }
};

export function loadMainCitiesWeather(city) {
  return function(dispatch) {
    return getMainCitiesWeather(city).then(mainCitiesWeather => {
      dispatch(loadMainCitiesWeatherSuccess(mainCitiesWeather));
    }).catch(error => {
      throw(error);
    });
  };
}
