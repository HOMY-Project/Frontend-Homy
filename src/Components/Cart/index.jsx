import React, { useEffect } from "react";
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
import { Button, Steps, Input, message, Popconfirm, Result } from "antd";
import Heading from "../Heading";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { removeItem, incrementQuantity, decrementQuantity } from '../../Redux/features/cartSlice';
import axios from "axios";
import "../Order/index.css";
import "./index.css";
import empty from '../../assets/empty-cart-removebg-preview.png';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
      const source = axios.CancelToken.source();
      if(token){
      const getCartProducts = async () => {
          try {
           const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${user.id}/cart`,
              {
              headers: { token: `Bearer ${token}` },
              }, 
              {
              cancelToken: source.token,
          });
          console.log(data, 'cart prod');
          } catch ({
          response: {
              data: { message: msg },
          },
          }) {
          message.warning(msg);
          }
      };
      getCartProducts();
  }
  return () => {
      source.cancel();
  };
  }, [])


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
  const { Step } = Steps;
  return (
    <div>
      {cart.products.length > 0 ? ( 
      <Container fluid style={{ marginTop: "3%" }} className="order-holder">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Shopping Cart</Breadcrumb.Item>
        </Breadcrumb>
        <Steps current={0}>
          <Step title="Review Order" />
          <Step title="Shipping & Payment" />
          <Step title="Confirm Order" />
        </Steps>
        <Heading heading={cart.products.length + "Items in your Cart"} />
        <Row>
          <Col lg="8" md="10" sm="12">
            <div className="productContainer">
              {cart.products.map((prod) => (
                <ListGroup.Item key={prod.id}>
                  <Row style={{ alignItems: "center" }}>
                    <Col md={3}>
                      <Image src={prod.image} alt={prod.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <span>{prod.name}</span>
                    </Col>
                    <Col md={3}>
                      <div className="quantity-holder">
                        <InputGroup className="mb-3">
                          <Button
                            variant="outline-secondary"
                            id="button-addon1"
                            onClick={() => dispatch(incrementQuantity(prod.id))}
                          >
                            +
                          </Button>
                          <Form.Control
                            className="quantityInput"
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon2"
                            disabled
                            value={prod.quantity}
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={() => dispatch(decrementQuantity(prod.id))}
                          >
                            -
                          </Button>
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md={2}>
                        <span style={{ fontWeight: "bold" , fontSize: "15px" }}> {prod.price * prod.quantity} KWD</span>
                    </Col>
                    <Col md={1}>
                    <Popconfirm
                          title="Are you sure to delete this task?"
                          onConfirm={() => {
                            handelDeleteProductCart(prod.id)
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
                </ListGroup.Item>
              ))}
            </div>
          </Col>
          <Col lg="4" md="2" sm="12">
            <Container className="orderSummary">
              <h3>Order Review</h3>
              <Row>
                <Col>
                  <Input.Group compact>
                    <Input
                      style={{
                        width: "calc(125% - 200px)",
                      }}
                      defaultValue="Have Promo code?"
                    />
                    <Button type="primary">Checkout</Button>
                  </Input.Group>
                </Col>
              </Row>
              <Row style={{ marginTop: "6%" }}>
                <Col lg="6">
                  <p className="main-title-summary">
                    Item Subtotal{" "}
                    <span style={{ color: "#9a9a9a" }}> ({cart.quantity } Item) </span>
                  </p>
                </Col>
                <Col lg="6">
                  <p>{cart.total} KWD</p>
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
                    {cart.total <1 ? '0' : cart.total} KWD
                  </p>
                </Col>
              </Row>
              <Row>
                <Link to={`/shipment`}>
                  <Button type="primary">Checkout</Button>
                </Link>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      ) : (
        <Result
        icon={<img src={empty} alt="empty-cart" style={{ width: '250px' }}/>}
        title="Your cart is empty!"
        extra={ <Link to="/"> <Button type="primary">Shop Now</Button> </Link>}
      />
      )}
    </div>
  );
};

export default Cart;
