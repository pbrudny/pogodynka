import weather from "openweather-apis";
import {mainCities} from "../data/mainCities";

const getWeatherForecast = () => {
  return new Promise((resolve, reject) => {
    weather.getWeatherForecast( (err, obj) => {
      if (err) reject(err);
      resolve(obj)
    })
  })
};

export const getCityWeather = async (city) => {
  weather.setCity(city);
  try {
    const response  = await getWeatherForecast();
    return response;
  } catch(error) {
    console.log(error);
    return error;
  }
};

export const getMainCitiesWeather = async (city) => {
  try {
    const response = await Promise.all([
      getCityWeather(mainCities[0]),
      getCityWeather(mainCities[1]),
      getCityWeather(mainCities[2])
    ]);
    return response;
  } catch(error) {
    console.log(error);
    return error;
  }
};
