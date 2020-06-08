import React from 'react';
import { Col, Row } from 'antd';
import Error404Gif from '../common/Error404Gif';

const NotFound = () => {
  return (
    <Row type="flex" justify="center" align="middle">
      <Col>
        <h2 style={{ textAlign: 'center' }}>City not found 404</h2>
        <Error404Gif />
      </Col>
    </Row>
  );
};

export default NotFound;
