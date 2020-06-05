import weather from "openweather-apis";
import {mainCities} from "../data/mainCities";

function getWeatherForecast() {
  return new Promise((resolve, reject) => {
    weather.getWeatherForecast( (err, obj) => {
      if (err) reject(err);
      resolve(obj)
    })
  })
};

export const getCityWeather = (city) => {
  weather.setCity(city);
  return getWeatherForecast().then(response => {
    return response;
  }).catch(error => {
    return error;
  });
};

export const getMainCitiesWeather = (city) => {
  Promise.all([
    getCityWeather(mainCities[0]),
    getCityWeather(mainCities[1]),
    getCityWeather(mainCities[2])
  ]).then(response => {
    console.log('res1', response)
    return response;
  }).catch(error => {
    return error;
  });
};
