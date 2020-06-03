import React, { Component } from 'react';
import { Input } from 'antd';
import { Space } from 'antd';
import weather from 'openweather-apis';
const { Search } = Input;

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class WeatherContainer extends Component {
  constructor() {
    super();
    this.getWeather = this.getWeather.bind(this)
  }

  componentDidMount() {
    weather.setLang('pl');
  }

  getWeather(city) {
    weather.setCity(city);
    console.log('API KEY: ', API_KEY);
    weather.setAPPID(API_KEY);
    weather.getTemperature(function(err, temp){
      console.log(temp);
    });
  }
  render() {
    return (
      <Space>
        <Search
          placeholder="podaj miasto"
          enterButton="Szukaj"
          size="large"
          onSearch={value => this.getWeather(value)}
        />
      </Space>
    )
  }
}

export default WeatherContainer;
