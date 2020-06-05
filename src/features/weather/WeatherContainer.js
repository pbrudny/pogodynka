import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { Input } from 'antd';
import { Space, Card, Row, Col } from 'antd';
import NotFound from "../../pages/NotFound";
import {loadCityWeather, loadMainCitiesWeather} from "../../actions/weatherActions";
import { format, parseISO } from 'date-fns'
import { pl } from 'date-fns/locale'
const { Search } = Input;

class WeatherContainer extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.mainCitiesWeather = this.mainCitiesWeather.bind(this);
  }
  componentDidMount() {
    const city = this.props.match.params.city;
    if (city) {
      this.props.dispatch(loadCityWeather(city));
      this.props.dispatch(loadMainCitiesWeather(city));
    }
  }

  hourlyWeather(list) {
    return list.slice(0, 8).map(el => {
      const {main, wind, weather, dt_txt} = el;
      return (
        <p key={dt_txt} style={{fontSize: '10px'}}>
          <strong>{ format(parseISO(dt_txt), "ccc p", {locale: pl}) + ' '}</strong>
          Temperatura: {main.temp}°C, Ciśnienie: {main.pressure}hpa, Wiatr: {wind.speed}m/s
        </p>
      )
    })
  }

  handleSearch(city) {
    this.props.dispatch(loadCityWeather(city));
    this.props.dispatch(loadMainCitiesWeather(city))
    history.push('/' + city);
  }

  mainCity(forecast) {
    if (forecast && forecast.cod === '200') {
      const title = `${forecast.city.name} (${forecast.city.country})`;
      return (
        <Card title={title} style={{ width: 400 }}>
          {this.hourlyWeather(forecast.list)}
        </Card>
      )
    } else if (forecast && forecast.cod === '404') {
      return <NotFound />
    }
  }

  mainCitiesWeather(forecasts) {
    return forecasts.map(cityWeather => {
      return (
        <Col span={8} key={cityWeather.city.name}>{this.mainCity(cityWeather)}</Col>
      )
    })
  }

  render() {
    return (<>
      <Row>
        <Col span={8} offset={8}>
        <Space direction="vertical" size="large" style={{paddingTop: '20px', width:'400px'}}>
          <Search
            placeholder="Podaj miasto np. Warszawa"
            enterButton="Szukaj"
            onSearch={city => this.handleSearch(city)}
          />
          <div>{this.mainCity(this.props.cityWeather)}</div>
        </Space>
        </Col>
      </Row>
        <hr />
        <Row>
          {this.mainCitiesWeather(this.props.mainCitiesWeather)}
        </Row>
    </>
    )
  }
}

const mapStateToProps = state => {
  return {
    cityWeather: state.cityWeather,
    mainCitiesWeather: state.mainCitiesWeather,
  };
};

export default connect(mapStateToProps)(WeatherContainer);
