import React from 'react';
import {Col, Input, Row, Space, Divider } from "antd";
import * as PropTypes from "prop-types";
import CityWeather from "./CityWeather";
import MainCitiesWeather from "./MainCitiesWeather";
import styled from 'styled-components';

const SpaceStyled = styled(Space)`
  padding-top: 20px;
  width: 400px
`;

const Weather = (props) => {
  const { Search } = Input;
  const { onSearch, cityWeather, mainCitiesWeather } = props;
  return <>
    <Row>
      <Col span={8} offset={8}>
        <SpaceStyled direction="vertical">
          <Search
            placeholder="Podaj miasto np. Warszawa"
            enterButton="Szukaj"
            onSearch={onSearch}
          />
          { cityWeather && <CityWeather forecast={cityWeather} />}
        </SpaceStyled>
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
};

Weather.propTypes = {
  onSearch: PropTypes.func.isRequired,
  cityWeather: PropTypes.object.isRequired,
  mainCitiesWeather: PropTypes.array.isRequired
};

export default Weather;