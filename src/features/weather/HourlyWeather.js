import React from 'react';
import { format, parseISO } from 'date-fns'
import { pl } from 'date-fns/locale'
import styled from 'styled-components';

const SpanGreen = styled.span`
  color: green;
`;

const SpanRed = styled.span`
  color: red;
`;

const SpanOrange = styled.span`
  color: orange;
`;

const HourlyWeather = (props) => {
  const { list, compareTo } = props;

  const compareInPL = (diff, units, type) => {
    const diffValue = parseInt(diff);
    let comp;

    if (type === 'masculine') {
      comp = ['mniejszy o', 'większy o', 'taki sam'];
    } else if (type === 'feminine') {
      comp = ['mniejsza o', 'większa o', 'taka sama'];
    } else {
      comp = ['mniejsze o', 'większe o', 'takie samo'];
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
    if (compareTo) {
      const {main: mainC, wind: windC} = compareTo.list[index];
      const tempDiff = main.temp - mainC.temp;
      const pressureDiff = main.pressure - mainC.pressure;
      const windDiff = main.speed - mainC.speed;

      const temp = tempDiff;
      return (
        <p key={dt_txt} style={{fontSize: '10px'}}>
          <strong>{ format(parseISO(dt_txt), "ccc p", {locale: pl}) + ' '}</strong>

          Temperatura: { compareInPL(tempDiff, '°C', 'feminine') },
          Ciśnienie: { compareInPL(pressureDiff, 'hpa', 'nondescript') },
          Wiatr: { compareInPL(windDiff, 'm/s', 'masculine') }
        </p>
      )
    } else {
      return (
        <p key={dt_txt} style={{fontSize: '10px'}}>
          <strong>{ format(parseISO(dt_txt), "ccc p", {locale: pl}) + ' '}</strong>
          Temperatura: {main.temp}°C, Ciśnienie: {main.pressure}hpa, Wiatr: {wind.speed}m/s
        </p>
      )
    }
  })
};

export default HourlyWeather;