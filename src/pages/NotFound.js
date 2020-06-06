import React from 'react';
import Error404Gif from "../common/Error404Gif";
import {Col, Row} from 'antd';

const NotFound = () => {
  return (
    <Row type="flex" justify="center" align="middle">
      <Col>
        <h2 style={{textAlign: "center"}}>City not found 404</h2>
        <Error404Gif/>
      </Col>
    </Row>
  )
};

export default NotFound;
