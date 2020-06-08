import weather from 'openweather-apis';

export const getWeatherForecast = () => {
  return new Promise((resolve, reject) => {
    weather.getWeatherForecast((err, obj) => {
      if (err) reject(err);
      resolve(obj);
    });
  });
};

export const getCityWeather = async (city) => {
  weather.setCity(city);
  try {
    const response = await getWeatherForecast();
    return response;
  } catch (error) {
    return error;
  }
};
