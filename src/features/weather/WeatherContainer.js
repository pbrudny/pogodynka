import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import {loadCityWeather, loadMainCitiesWeather} from "../../actions/weatherActions";
import Weather from "./Weather";

//TODO:
// add prop-types
// clean code
// - async/await
// styles guides?

class WeatherContainer extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    const city = this.props.match.params.city;
    if (city) {
      this.handleSearch(city)
    }
  }

  handleSearch(city) {
    this.props.dispatch(loadCityWeather(city));
    this.props.dispatch(loadMainCitiesWeather(city));
    history.push('/' + city.toLowerCase());
  }

  render() {
    return (
      <Weather
        onSearch={city => this.handleSearch(city)}
        cityWeather={this.props.cityWeather}
        mainCitiesWeather={this.props.mainCitiesWeather}
      />
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
