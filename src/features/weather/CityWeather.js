import React from 'react';
import { Card } from 'antd';
import NotFound from "../../pages/NotFound";
import HourlyWeather from "./HourlyWeather";

function CityWeather(props) {
  const { forecast, compareTo } = props;

  if (forecast && forecast.cod === '200') {
    const title = `${forecast.city.name} (${forecast.city.country})`;
    return (
      <Card title={title} style={{ width: 400 }}>
        <HourlyWeather list={forecast.list} compareTo={compareTo}/>
      </Card>
    )
  } else if (forecast && forecast.cod === '404') {
    return <NotFound />
  } else {
    return '';
  }
}

export default CityWeather;
