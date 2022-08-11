import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Descriptions } from "antd";
import CardGroup from "react-bootstrap/CardGroup";
import Heading from "../Heading";
import OrderProduct from './orderProduct';
import "./index.css";
import paymentImg from "../../assets/payment.jpg";
import { useSelector } from "react-redux";


const SingleOrder = () => {
  const { orderDetails: { order_number, payment, products, addresses, phone } } = useSelector((state) => state.singleOrder);
  const { subTotal } = useSelector((state) => state.singleOrder);

  return (
    <div>
      <Container fluid style={{ marginTop: "3%" }} className="order-holder">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Account</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Orders</Breadcrumb.Item>
          <Breadcrumb.Item active>Order {order_number}</Breadcrumb.Item>
        </Breadcrumb>
        <Heading heading={<p>Order {order_number}</p>}/>
        <Row>
          <Col lg="8" md="10" sm="12">
            <Row style={{ marginBottom: "2%" }}>
              <CardGroup style={{ justifyContent : "space-between" }}>
                {products.map(product => 
                    <OrderProduct product={product}/>
                  )}
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
                      style={{ fontSize: '20px'}}
                    >
                      <Descriptions.Item label="City">
                        {addresses[0]}
                      </Descriptions.Item>
                      <Descriptions.Item label="Area">
                       {addresses[1]}
                      </Descriptions.Item>
                      <Descriptions.Item label="street">
                      {addresses[2]}
                      </Descriptions.Item>
                      <Descriptions.Item label="block No.">
                      {addresses[3]}
                      </Descriptions.Item>
                      <Descriptions.Item label="Building No.">
                      {addresses[4]}
                      </Descriptions.Item>
                      <Descriptions.Item label="Phone No.">
                      {phone}
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
                      style={{ fontSize: '20px'}}
                    >
                      <div style={{ display: "flex" }}>
                        <img
                          alt="example"
                          src={paymentImg}
                          style={{ width: "80px" }}
                        />
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "bold",
                            marginLeft: "2%",
                          }}
                        >
                        {payment}
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
                <Col lg="6" ><p>{subTotal} KWD</p></Col>
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
