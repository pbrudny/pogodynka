import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { Input } from 'antd';
import { Space, Card, Row, Col } from 'antd';
import NotFound from "../../pages/NotFound";
import {loadCityWeather} from "../../actions/weatherActions";
const { Search } = Input;

class WeatherContainer extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }
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

  handleSearch(city) {
    this.props.dispatch(loadCityWeather(city));
    history.push('/' + city);
  }

  mainCity() {
    const forecast = this.props.cityWeather;

    if (forecast && forecast.cod === '200') {
      const title = `${forecast.city.name} (${forecast.city.country})`;
      return (
        <Card title={title} style={{ width: 650 }}>
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
        <Space direction="vertical" size="large" style={{paddingTop: '20px', width:'650px'}}>
          <Search
            placeholder="Podaj miasto np. Warszawa"
            enterButton="Szukaj"
            onSearch={city => this.handleSearch(city)}
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
