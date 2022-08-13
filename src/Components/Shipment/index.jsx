import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
    Container,
    Col,
    Form,
    Image,
    Row,
    Breadcrumb,
    InputGroup,
  } from "react-bootstrap";
import {
  Button,
  Steps,
  message,
  Radio,
  Input,
  Popconfirm,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
import { removeItem, incrementQuantity, decrementQuantity } from '../../Redux/features/cartSlice';
import "../Order/index.css";
import paymentImg from "../../assets/payment.jpg";

const Shipment = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [block, setBlock] = useState("");
  const [payment, setPayment ] = useState("Knet");
  const { products, quantity, total } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { Step } = Steps;
  const handelShipment = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order`,
        {
          name,
          email,
          phoneNumber,
          addresses: [city, area, street, block, building],
          products: products.map((prod) => [prod.id, prod.quantity]),
          payment
        }
      );
      message.success(data);
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };
  const handelDeleteProductCart = async (productId) =>{
    if (token) {
      try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/cart/${productId}`
        , { headers: { token: `Bearer ${token}` } });
        dispatch(removeItem(productId));
        message.success('product deleted successfully');
      } catch ({ response: {data: { message: msg }} }) {
        message.error(msg);
      }
    }else{
      dispatch(removeItem(productId));
    }
    }   
  return (
    <div>
      <Container fluid style={{ marginTop: "3%" }} className="order-holder">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Shopping Cart</Breadcrumb.Item>
        </Breadcrumb>
        <Steps current={1} style={{marginBottom: "3%"}}>
          <Step title="Review Order" />
          <Step title="Shipping & Payment" />
          <Step title="Confirm Order" />
        </Steps>
        <Row>
          <Col lg="7" md="8" sm="12">
            <Row>
            <div style={{ display: "flex", justifyContent: "space-between" ,alignItems: "center", marginBottom: "2%"}}>
                <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Checkout
                </h3>
                <div style={{ display: "flex", justifyContent: "space-evenly" ,alignItems: "center", width: '40%'}}>
                    <p style={{ marginBottom: '0', marginLeft: '2%'}}>Existing customer?</p>
                    <Link to='/signup'>  <Button style={{ color: '#1890FF !important', borderColor: '#1890FF !important' }}>Sign In</Button> </Link>
                </div>
            </div>
            <hr style= {{color: '#ccc'}}/>
              <Col lg="7" md="8" sm="12">
                <div>
                  <div className="shippingInfo">
                    <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Shipping Information
                    </h3>
                    <hr style= {{color: '#ccc'}}/>
                    <div>
                      <Form style={{ marginTop: "2%" }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter full Name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Order Number"
                            value={phoneNumber}
                            onChange={(e) => setphoneNumber(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Area</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Street</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Block</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Block"
                            value={block}
                            onChange={(e) => setBlock(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>House/Building No</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Building No"
                            value={building}
                            onChange={(e) => setBuilding(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="4" md="8" sm="12">
                <div>
                  <div className="shippingInfo">
                    <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Payment Method
                    </h3>
                    <hr style= {{color: '#ccc'}}/>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Radio.Group onChange={(e) => setPayment(e.target.value)} value={payment}>
                      <Radio defaultChecked value="Knet">Knet Payment</Radio>
                    </Radio.Group>
                        <img
                          alt="example"
                          src={paymentImg}
                          style={{ width: "60px" }}
                        />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg="5" md="4" sm="12">
          <Container className="orderSummary">
              <h3>Summary</h3>
              <hr />
              {products.map((product) => (
              <Row style={{ marginBottom: "2%"}}>
                <Col  sm="3">  
                    <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col sm="9">  
                    <Row>
                        <Col sm="10">
                             <p style={{ fontWeight: 'bold' }}>{product.name}</p>
                        </Col>
                        <Col sm="2"> 
                            <Popconfirm
                          title="Are you sure to delete this task?"
                          onConfirm={() => {
                            handelDeleteProductCart(product.id)
                          }}
                          onCancel={(e) => {
                            console.log(e);
                            message.error('something went wrong');
                          }}
                          okText="Yes"
                          cancelText="No"
                          >
                        <Button
                            type="button"
                            variant="light"
                            className="btn btn-danger Cart-btn"
                        >
                            <CloseOutlined />
                        </Button>
                          </Popconfirm>
                        </Col>
                    </Row>
                    <Row style={{ alignItems: "center "}}>
                        <Col sm="5">
                            <p>{product.price * product.quantity} KWD</p>
                        </Col>
                        <Col sm="5">
                        <div className="quantity-holder">
                        <InputGroup className="mb-3">
                          <Button
                            variant="outline-secondary"
                            id="button-addon1"
                            onClick={() => dispatch(incrementQuantity(product.id))}
                          >
                            +
                          </Button>
                          <Form.Control
                            className="quantityInput"
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon2"
                            disabled
                            value={product.quantity}
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={() => dispatch(decrementQuantity(product.id))}
                          >
                            -
                          </Button>
                        </InputGroup>
                        </div>
                        </Col>
                    </Row>
                </Col>
              </Row>
                ))}
              <Row style={{ marginTop: "6%" }}>
                <Col lg="6">
                  <p className="main-title-summary">
                    Item Subtotal{" "}
                    <span style={{ color: "#9a9a9a" }}> ({quantity } Item) </span>
                  </p>
                </Col>
                <Col lg="6">
                  <p>{total} KWD</p>
                </Col>
              </Row>
              <Row style={{ marginTop: "3%" }}>
                <Col lg="6">
                  <p className="main-title-summary">Shipping</p>
                  <p style={{ color: "#9a9a9a" }}>Standart Delivery</p>
                </Col>
                <Col lg="6">
                  <p>Free</p>
                </Col>
              </Row>
              <Row>
                <hr />
                <Col>
                  <p className="main-title-summary">Total</p>
                </Col>
                <Col>
                  <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                    {total <1 ? '0' : total} KWD
                  </p>
                </Col>
              </Row>
              <Row>
                <Link to={`/shipment`}>
                  <Button type="primary">Confirm Order Now</Button>
                </Link>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shipment;
