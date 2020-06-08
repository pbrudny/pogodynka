import React from "react";
import { Col } from "antd";
import CityWeather from "./CityWeather";
import * as PropTypes from "prop-types";

const MainCitiesWeather = (props) => {
  const { forecasts, compareTo } = props;
  return forecasts.map(cityWeather => {
    return (
      <Col span={8} key={cityWeather.city.name}>
        <CityWeather forecast={cityWeather} compareTo={compareTo}/>
      </Col>
    )
  })
};

MainCitiesWeather.propTypes = {
  forecasts: PropTypes.array.isRequired,
  compareTo: PropTypes.object
};
export default MainCitiesWeather;
