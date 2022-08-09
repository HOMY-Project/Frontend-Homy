import React, { useState, useEffect } from "react";
import { StarFilled } from "@ant-design/icons";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Button, Descriptions } from "antd";
import CardGroup from "react-bootstrap/CardGroup";
import Heading from "../Heading";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./index.css";
import logo from "../../assets/logo.png";
import payment from "../../assets/payment.jpg";
// import "./media.css";
import "./index.css";

const SingleOrder = () => {
  const { Meta } = Card;
  return (
    <div>
      <Container fluid style={{ marginTop: "3%" }} className="order-holder">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Account</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Orders</Breadcrumb.Item>
          <Breadcrumb.Item active>Order 12345</Breadcrumb.Item>
        </Breadcrumb>
        <Heading heading="Order 12345" />
        <Row>
          <Col lg="8" md="10" sm="12">
            <Row style={{ marginBottom: "2%" }}>
              <CardGroup>
                <Col lg="5" md="6" sm="12">
                  <Card
                    bordered={false}
                    cover={<img alt="example" src={logo} />}
                  >
                    <Meta
                      title={
                        <Link to={"/api/v1/product/${product.id}"}>
                          {" "}
                          prdocut 9
                        </Link>
                      }
                      description="Smart Switches"
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "2%",
                        marginTop: "3%",
                      }}
                    >
                      <StarFilled />{" "}
                      <span style={{ marginLeft: "2%" }}>5.0</span>
                    </div>
                    <div className="price-holder">
                      <p className="price">500 KWD</p>
                      <p className="Qun">Qty: 2</p>
                    </div>
                  </Card>
                </Col>
                <Col lg="5" md="6" sm="12">
                  <Card
                    bordered={false}
                    cover={<img alt="example" src={logo} />}
                  >
                    <Meta
                      title={
                        <Link to={"/api/v1/product/${product.id}"}>
                          {" "}
                          prdocut 9
                        </Link>
                      }
                      description="Smart Switches"
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "2%",
                        marginTop: "3%",
                      }}
                    >
                      <StarFilled />{" "}
                      <span style={{ marginLeft: "2%" }}>5.0</span>
                    </div>
                    <div className="price-holder">
                      <p className="price">500 KWD</p>
                      <p className="Qun">Qty: 2</p>
                    </div>
                  </Card>
                </Col>
              </CardGroup>
            </Row>
            <Row>
              <CardGroup className="cardDesc">
                <Col lg="7" md="6" sm="12">
                  <div className="Shipping-holder">
                    <Descriptions
                      size="small"
                      column={2}
                      title="Shipping Information"
                    >
                      <Descriptions.Item label="Created">
                        Lili Qu
                      </Descriptions.Item>
                      <Descriptions.Item label="Association">
                        <a>421421</a>
                      </Descriptions.Item>
                      <Descriptions.Item label="Creation Time">
                        2017-01-10
                      </Descriptions.Item>
                      <Descriptions.Item label="Effective Time">
                        2017-10-10
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </Col>
                <Col lg="4" md="6" sm="12">
                  <div className="Shipping-holder payment">
                    <Descriptions
                      size="small"
                      column={1}
                      title="Payment Method"
                    >
                      <div style={{ display: "flex" }}>
                        <img
                          alt="example"
                          src={payment}
                          style={{ width: "80px" }}
                        />
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "bold",
                            marginLeft: "2%",
                          }}
                        >
                          Ending 1234
                        </p>
                      </div>
                    </Descriptions>
                  </div>
                </Col>
              </CardGroup>
            </Row>
          </Col>
          <Col lg="4" md="2" sm="12">
            <Container className="orderSummary">
              <h3>Order Summary</h3>
              <Row style={{ marginTop: "6%" }} >
                <Col lg="6"><p className="main-title-summary">Item Subtotal <span style={{ color: "#9a9a9a"}}> (4 Item) </span></p></Col>
                <Col lg="6" ><p>24.00 KWD</p></Col>
              </Row>
              <Row style={{ marginTop: "3%" }} >
                <Col  lg="6"><p className="main-title-summary">Shipping</p><p style={{ color: "#9a9a9a"}}>Standart Delivery</p></Col>
                <Col  lg="6"><p>Free</p></Col>
              </Row>
              <Row>
                <hr />
                <Col><p className="main-title-summary">Total</p></Col>
                <Col><p style={{ fontWeight: "bold" , fontSize: "17px" }}>24.00 KWD</p></Col>
              </Row>
              <Row>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleOrder;
