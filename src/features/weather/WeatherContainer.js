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
    this.getWeather = this.getWeather.bind(this);
    this.cities = this.cities.bind(this);
  }

  componentDidMount() {
    weather.setLang('pl');
    weather.setAPPID(API_KEY);
    const city = this.props.match.params.city;
    if (city) {
      this.getWeather(city);
    }
  }

  getWeather(city) {
    const result = weather.setCity(city);
    console.log('result', result);
    weather.getWeatherForecast( (err, obj) => {
      this.setState({cityForecast: obj})
    });
  }

  // setCityForecast(city) {
  //   this.setState({cityForecast: this.getWeather(city)})
  // }

  cities() {
    const forecast = this.state.cityForecast;

    if (forecast && forecast.cod === '200') {
      const city = forecast.city.name;
      const {main, wind, weather}= forecast.list[0];
      return (
        <Card title={city} style={{ width: 500 }}>
         <p>{weather[0].description} {main.temp} °C  (Ciśnienie: {main.pressure}hpa, Wiatr: {wind.speed}m/s)</p>
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
            placeholder="podaj miasto"
            enterButton="Szukaj"
            size="large"
            onSearch={value => this.getWeather(value)}
          />
          {this.cities()}
        </Space>
        </Col>
      </Row>
    )
  }
}

export default WeatherContainer;
