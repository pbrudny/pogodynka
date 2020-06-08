import React from "react";
import { Card, Row, Col } from "antd";
import NotFound from "../../pages/NotFound";
import HourlyWeather from "./HourlyWeather";
import styled from "styled-components";
import * as PropTypes from "prop-types";

const Span = styled.span`
  font-size: 12px;
  padding-bottom: 10px;
`;

const CardStyled = styled(Card)`
  width: 400px;
`;

const RowStyled = styled(Row)`
  padding-bottom: 10px;
`;

const CityWeather = (props) => {
  const { forecast, compareTo } = props;

  if (forecast && forecast.cod === '200') {
    const title = `${forecast.city.name} (${forecast.city.country})`;
    return (
      <CardStyled title={title}>
        <RowStyled>
          <Col span={6}>
            <Span>Dzień</Span>
          </Col>
          <Col span={6}>
            <Span>Temperatura</Span>
          </Col>
          <Col span={6}>
            <Span>Ciśnienie</Span>
          </Col>
          <Col span={6}>
            <Span>Wiatr</Span>
          </Col>
        </RowStyled>
        <HourlyWeather list={forecast.list} compareTo={compareTo} />
      </CardStyled>
    )
  } else if (forecast && forecast.cod === '404') {
    return <NotFound />
  } else {
    return '';
  }
};

CityWeather.propTypes = {
  forecast: PropTypes.object.isRequired,
  compareTo: PropTypes.object,
};

export default CityWeather;
