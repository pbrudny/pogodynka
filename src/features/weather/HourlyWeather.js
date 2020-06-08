import React from "react";
import { format, parseISO } from "date-fns";
import { pl } from "date-fns/locale";
import { Row, Col } from "antd";
import styled from "styled-components";
import * as PropTypes from "prop-types";

const SpanGreen = styled.span`
  color: green;
`;

const SpanRed = styled.span`
  color: red;
`;

const SpanOrange = styled.span`
  color: orange;
`;

const RowStyled = styled(Row)`
  font-size: 10px;
`;

const HourlyWeather = (props) => {
  const { list, compareTo } = props;

  const compareInPL = (diff, units, type) => {
    const diffValue = parseInt(diff);
    let comp;

    if (type === "masculine") {
      comp = ["mniejszy o", "większy o", "taki sam"];
    } else if (type === "feminine") {
      comp = ["mniejsza o", "większa o", "taka sama"];
    } else {
      comp = ["mniejsze o", "większe o", "takie samo"];
    }

    if (diffValue < 0) {
      return <SpanRed>{`${comp[0]} ${ Math.abs(diffValue)} ${units}`}</SpanRed>
    } else if (diffValue > 0) {
      return <SpanGreen>{`${comp[1]} ${parseInt(diffValue)} ${units}`}</SpanGreen>;
    } else {
      return <SpanOrange>{comp[2]}</SpanOrange>;
    }
  };

  return list.slice(0, 8).map((el, index) => {
    const {main, wind, dt_txt} = el;
    let temp = `${parseInt(main.temp)} °C`;
    let pressure = `${main.pressure} hpa`;
    let windSpeed = `${wind.speed} m/s`;

    if (compareTo) {
      const { main: mainC, wind: windC } = compareTo.list[index];
      temp = compareInPL(main.temp - mainC.temp, '°C', 'feminine');
      pressure = compareInPL(main.pressure - mainC.pressure, 'hpa', 'nondescript');
      windSpeed = compareInPL(wind.speed - windC.speed, 'm/s', 'masculine');
    }

    return (
      <RowStyled key={dt_txt}>
        <Col span={6}>
          <strong>{ format(parseISO(dt_txt), "ccc p", {locale: pl}) + ' '}</strong>
        </Col>
        <Col span={6}>
          { temp }
        </Col>
        <Col span={6}>
          { pressure }
        </Col>
        <Col span={6}>
          { windSpeed }
        </Col>
      </RowStyled>
    )
  })
};

HourlyWeather.propTypes = {
  list: PropTypes.array.isRequired,
  compareTo: PropTypes.object
};

export default HourlyWeather;