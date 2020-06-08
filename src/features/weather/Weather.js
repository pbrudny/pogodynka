import React from "react";
import { Col, Input, Row, Space, Divider } from "antd";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import CityWeather from "./CityWeather";
import MainCitiesWeather from "./MainCitiesWeather";

const SpaceStyled = styled(Space)`
  padding-top: 20px;
  width: 400px;
`;

const Weather = ({ onSearch, cityWeather, mainCitiesWeather }) => {
  const { Search } = Input;
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
    { cityWeather && cityWeather.cod === "200" &&
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
  mainCitiesWeather: PropTypes.array.isRequired,
};

export default Weather;
