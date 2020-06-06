import React from 'react';
import {Col, Input, Row, Space, Divider } from "antd";
import * as PropTypes from "prop-types";
import CityWeather from "./CityWeather";
import MainCitiesWeather from "./MainCitiesWeather";
const { Search } = Input;

function Weather(props) {
  const { onSearch, cityWeather, mainCitiesWeather } = props;
  return <>
    <Row>
      <Col span={8} offset={8}>
        <Space direction="vertical" size="large" style={{paddingTop: "20px", width: "400px"}}>
          <Search
            placeholder="Podaj miasto np. Warszawa"
            enterButton="Szukaj"
            onSearch={onSearch}
          />
          { cityWeather && <CityWeather forecast={cityWeather} />}
        </Space>
      </Col>
    </Row>
    {props.cityWeather.cod === "200" &&
      <div>
        <Divider plain>Porównanie</Divider>
        <Row>
          <MainCitiesWeather
            compareTo={cityWeather}
            forecasts={mainCitiesWeather}
          />
        </Row>
      </div>
    }
  </>;
}

Weather.propTypes = {
  onSearch: PropTypes.func.isRequired,
  cityWeather: PropTypes.shape({}).isRequired,
  mainCitiesWeather: PropTypes.any.isRequired
};

export default Weather;