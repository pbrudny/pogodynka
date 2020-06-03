import React, { Component } from 'react';
import { Input } from 'antd';
import { Space, Card, Row, Col } from 'antd';
import weather from 'openweather-apis';
import NotFound from "../../pages/NotFound";
const { Search } = Input;

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const mainCities = [
  'Białystok',
  'Bydgoszcz',
  'Gdańsk',
  'Katowice',
  'Kielce',
  'Kraków',
  'Lublin',
  'Łódź',
  'Olsztyn',
  'Opole',
  'Poznań',
  'Rzeszów',
  'Szczecin',
  'Warszawa',
  'Wrocław',
  'Zielona Góra'
];
class WeatherContainer extends Component {
  state = {
    cityForecast: null,
    mainCitiesForecast: null
  };

  constructor() {
    super();
    this.setWeather = this.setWeather.bind(this);
    this.mainCity = this.mainCity.bind(this);
  }

  componentDidMount() {
    weather.setLang('pl');
    weather.setAPPID(API_KEY);
    const city = this.props.match.params.city;
    if (city) {
      this.setWeather(city);
    }
  }

  getWeatherForecast(city) {
    return new Promise((resolve, reject) => {
      weather.getWeatherForecast( (err, obj) => {
        if (err) reject(err);
        resolve(obj)
      })
    })
  }

  async setWeather(city) {
    weather.setCity(city);
    const forecast = await this.getWeatherForecast();
    this.setState({cityForecast: forecast});
  }

  getOtherCities(city) {
    const otherCities = mainCities.filter((value) => value !== city);
    this.setState({mainCitiesForecast: otherCities.map(city => {
      weather.setCity(city);
      weather.getWeatherForecast( (err, obj) => {
      });
    })})
  }

  hourlyWeather(list) {
    return list.slice(0, 5).map(el => {
      const {main, wind, weather, dt_txt} = el;
      return (
        <p>{dt_txt}: {weather[0].description} {main.temp} °C  (Ciśnienie: {main.pressure}hpa, Wiatr: {wind.speed}m/s)</p>
      )
    })
  }

  mainCity() {
    const forecast = this.state.cityForecast;

    if (forecast && forecast.cod === '200') {
      const city = forecast.city.name;

      return (
        <Card title={city} style={{ width: 650 }}>
          {console.log(forecast.list)}
          {this.hourlyWeather(forecast.list)}
        </Card>
      )
    } else if (forecast && forecast.cod === '404') {
      return <NotFound />
    }
  }
  render() {
    return (
      <Row>
        <Col span={8} offset={8}>
        <Space direction="vertical" size="large" style={{paddingTop: '20px'}}>
          <Search
            placeholder="Podaj miasto np. Warszawa"
            enterButton="Szukaj"
            size="large"
            onSearch={value => this.setWeather(value)}
          />
          {this.mainCity()}
        </Space>
        </Col>
      </Row>
    )
  }
}

export default WeatherContainer;
