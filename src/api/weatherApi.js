import weather from "openweather-apis";

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
