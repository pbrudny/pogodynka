import React from 'react';
import { Col } from 'antd';
import * as PropTypes from 'prop-types';
import CityWeather from './CityWeather';

const MainCitiesWeather = ({ forecasts, compareTo }) => {
  return forecasts.map(cityWeather => {
    return (
      <Col span={8} key={cityWeather.city.name}>
        <CityWeather forecast={cityWeather} compareTo={compareTo} />
      </Col>
    );
  });
};

MainCitiesWeather.propTypes = {
  forecasts: PropTypes.array.isRequired,
  compareTo: PropTypes.object,
};
export default MainCitiesWeather;
