import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import history from '../../history';
import {
  loadCityWeather,
  loadMainCitiesWeather,
} from '../../actions/weatherActions';
import Weather from './Weather';

class WeatherContainer extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { match: { params: { city } } } = this.props;
    if (city) {
      this.handleSearch(city);
    }
  }

  handleSearch(city) {
    const { dispatch } = this.props;
    dispatch(loadCityWeather(city));
    dispatch(loadMainCitiesWeather(city));
    history.push(`/${city.toLowerCase()}`);
  }

  render() {
    const { cityWeather, mainCitiesWeather } = this.props;

    return (
      <Weather
        onSearch={(city) => this.handleSearch(city)}
        cityWeather={cityWeather}
        mainCitiesWeather={mainCitiesWeather}
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
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(WeatherContainer);
