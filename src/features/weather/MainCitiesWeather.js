import React from 'react';
import { Col } from 'antd';
import CityWeather from "./CityWeather";

function MainCitiesWeather(props) {
  const { forecasts, compareTo } = props;
  return forecasts.map(cityWeather => {
    return (
      <Col span={8} key={cityWeather.city.name}>
        <CityWeather forecast={cityWeather} compareTo={compareTo}/>
      </Col>
    )
  })
}
export default MainCitiesWeather;
