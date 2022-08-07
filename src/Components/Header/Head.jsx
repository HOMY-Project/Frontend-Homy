import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <Row>
              <Col>Accepting order 24 hours</Col>
              <Col>Free delivery for more than 50 KWD</Col>
              <Col>Delivery within 24 hours</Col>
          </Row>
        </div>
      </section>
    </>
  )
}

export default Head;
