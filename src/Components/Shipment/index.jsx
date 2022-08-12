import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  Container,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Breadcrumb,
  InputGroup,
} from "react-bootstrap";
import { Button, Steps, Input, message, Popconfirm } from "antd";
import Heading from "../Heading";
import { useSelector,useDispatch } from "react-redux";
import { removeItem } from '../../Redux/features/cartSlice';
import axios from "axios";
import "../Order/index.css";
// import "./index.css"

const Shipment = () => {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [street, setStreet] = useState("");
    const [building, setBuilding] = useState("");
    const [block, setBlock] = useState("");

    const { Step } = Steps;

    const handelShipment = async () =>{
        try {
          const {
            data: { message : verifyMessage },
          } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/order`,
            {
              name,
              email,
              phoneNumber,
              addresses: [city, area, street, block, building]
            }
          );
          message.success(verifyMessage);
        } catch ({
          response: {
            data: { message: msg },
          },
        }) {
          message.error(msg);
        }
      }

    return (
        <div>
            <Container fluid style={{ marginTop: "3%" }} className="order-holder">
            <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/">Shopping Cart</Breadcrumb.Item>
            </Breadcrumb>
            <Steps current={1}>
                <Step title="Review Order" />
                <Step title="Shipping & Payment" />
                <Step title="Confirm Order" />
            </Steps>
            <Row>
                <Col lg="9" md="8" sm="12" >
                <Heading heading="Checkout" />
                <Row>
                    <Col lg="7" md="8" sm="12" >
                        <div>
                            <div className="shippingInfo">
                                <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Shipping Information</h3>
                                <hr />
                                <div>
                                <Form style={{ marginTop: "2%" }}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="email" placeholder="Enter full Name" value={name} onChange={(e) => setname(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Order Number" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Area</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Area" value={area} onChange={(e) => setArea(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Street</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Street" value={street} onChange={(e) => setStreet(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Block</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Block" value={block} onChange={(e) => setBlock(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>House/Building No</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Building No" value={building} onChange={(e) => setBuilding(e.target.value)} required/>
                                    </Form.Group>
                                </Form>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg="4" md="8" sm="12" >
                        <div>
                            <div className="shippingInfo">
                                <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Payment Method</h3>
                                <hr />
                            </div>
                        </div>
                    </Col>
                </Row>
                </Col>
                <Col lg="3" md="4" sm="12" >

                </Col>
            </Row>

            </Container>
        </div>
    );
};

export default Shipment;