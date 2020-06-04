import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input } from 'antd';
import { Space, Card, Row, Col } from 'antd';
import NotFound from "../../pages/NotFound";
import {loadCityWeather} from "../../actions/weatherActions";
const { Search } = Input;

class WeatherContainer extends Component {
  componentDidMount() {
    const city = this.props.match.params.city;
    if (city) {
      this.props.dispatch(loadCityWeather(city));
    }
  }

  hourlyWeather(list) {
    return list.slice(0, 5).map(el => {
      const {main, wind, weather, dt_txt} = el;
      return (
        <p key={dt_txt}>
          {dt_txt}: {weather[0].description} {main.temp} °C  (Ciśnienie: {main.pressure}hpa, Wiatr: {wind.speed}m/s)
        </p>
      )
    })
  }

  mainCity() {
    const forecast = this.props.cityWeather;

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
            onSearch={city => this.props.dispatch(loadCityWeather(city))}
          />
          {this.mainCity()}
        </Space>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    cityWeather: state
  };
};

export default connect(mapStateToProps)(WeatherContainer);
