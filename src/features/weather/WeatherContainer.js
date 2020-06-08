import React, { Component } from "react";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import history from "../../history";
import {
  loadCityWeather,
  loadMainCitiesWeather,
} from "../../actions/weatherActions";
import Weather from "./Weather";

class WeatherContainer extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const city = this.props.match.params.city;
    if (city) {
      this.handleSearch(city);
    }
  }

  handleSearch(city) {
    this.props.dispatch(loadCityWeather(city));
    this.props.dispatch(loadMainCitiesWeather(city));
    history.push(`/${city.toLowerCase()}`);
  }

  render() {
    return (
      <Weather
        onSearch={(city) => this.handleSearch(city)}
        cityWeather={this.props.cityWeather}
        mainCitiesWeather={this.props.mainCitiesWeather}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cityWeather: state.cityWeather,
    mainCitiesWeather: state.mainCitiesWeather,
  };
};

WeatherContainer.propTypes = {
  cityWeather: PropTypes.object.isRequired,
  mainCitiesWeather: PropTypes.array.isRequired,
};

WeatherContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      city: PropTypes.string,
    }),
  }),
  cityWeather: PropTypes.object.isRequired,
  mainCitiesWeather: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(WeatherContainer);
