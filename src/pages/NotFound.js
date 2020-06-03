import React, { Component } from 'react';
import Error404Gif from "../common/Error404Gif";
import { Row, Col } from 'antd';

class NotFound extends Component {
  render() {
    return (
      <Row>
        <Col span={8} offset={8}>
          <h2 style={{textAlign: "center"}}>Place not found - 404</h2>
          <Error404Gif />
        </Col>
      </Row>
    )
  }
}
export default NotFound;
