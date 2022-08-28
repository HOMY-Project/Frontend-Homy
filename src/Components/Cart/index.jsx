import React, { useEffect, useContext, useState } from "react";
import LocaleContext from '../../translations/LocaleContext';
import { CloseOutlined } from "@ant-design/icons";
import {
  Container,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { Button, Steps, Input, message, Popconfirm, Result, Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
import Heading from "../Heading";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { removeItem, incrementQuantity, decrementQuantity, setTotalAfterDiscount } from '../../Redux/features/cartSlice';
import empty from '../../assets/empty-cart-removebg-preview.png';
import Header from '../Header';
import MainFooter from '../Footer';
import "../Order/index.css";
import "./index.css";

const Cart = () => {
  const { locale } = useContext(LocaleContext);
  const cart = useSelector((state) => state.cart);
  const [discount, setDiscount ] = useState(0);
  const [code, setCode] = useState('');
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

const applyPromoCode = async () => {
  try {
    const { data: { data }} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/promo-code/${code}`);
    setDiscount(parseInt(data[0]?.discount));
    dispatch(setTotalAfterDiscount(discount));


    message.success('Congratulations, you got the discount')

  } catch ({
    response: {
      data: { message: msg },
    },
  }) { 
    message.warning(msg);
  }finally{
    setCode('');
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
  const { Step } = Steps;
  return (
    <div>
      <Header />
      {cart.products.length > 0 ? ( 
      <Container fluid style={{ marginTop: "3%" }} className="order-holder">
        <Breadcrumb style={{ marginBottom: "4%"}}>
            <Breadcrumb.Item>
              <a href="/">{t('Home')}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/cart">{t('Shopping Cart')}</a>
            </Breadcrumb.Item>
        </Breadcrumb>

        <Steps current={0}>
          <Step title={t("Review Order")} />
          <Step title={t("Shipping & Payment")} />
          <Step title={t("Confirm Order")} />
        </Steps>
        <Heading heading={cart.products.length + " " + t("Items in your Cart")} />
        <Row>
          <Col lg="8" md="10" sm="12">
            <div className="productContainer">
              {cart.products.map((prod) => (
                <ListGroup.Item key={prod.id}>
                  <Row style={{ alignItems: "center" }}>
                    <Col md={3}>
                      <Image src={prod.image} alt={prod.name} fluid rounded />
                    </Col>
                    <Col md={2}>
                      <span>{prod.name}</span>
                    </Col>
                    <Col md={3}>
                      <div className="quantity-holder">
                        <InputGroup className="mb-3">
                          <Button
                            variant="outline-secondary"
                            id={locale === 'en' ? 'button-addon1' : 'button-addon2'}
                            onClick={() => dispatch(incrementQuantity(prod.id))}
                          >
                            +
                          </Button>
                          <Form.Control
                            className="quantityInput"
                            style={{border: 'none !important'}}
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon2"
                            disabled
                            value={prod.quantity}
                          />
                          <Button
                            variant="outline-secondary"
                            id={locale === 'en' ? 'button-addon2' : 'button-addon1'}
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
                    <Col md={2}>
                    <Popconfirm
                          title="Are you sure to delete this task?"
                          onConfirm={() => {
                            handelDeleteProductCart(prod.id)
                          }}
                          onCancel={(e) => {
                            message.error('something went wrong');
                          }}
                          okText="Yes"
                          cancelText="No"
                          >
                        <Button
                            type="button"
                            variant="light"
                            className="btn btn-cancelIcon"
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
              <h3 style={{ marginBottom: "5%"}}>{t('Order Review')}</h3>
              <Row>
                <Col>
                  <Input.Group compact>
                    <Input
                      style={{
                        width: "calc(125% - 200px)",
                      }}
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={t("Have Promo code?")}
                    />
                    <Button type="primary" onClick={applyPromoCode} style={{height: '40px'}}>{t('Apply')}</Button>
                  </Input.Group>
                  
                </Col>
              </Row>
              <Row style={{ marginTop: "6%" }}>
                <Col lg="6">
                  <p className="main-title-summary">
                  {t('Item Subtotal')}{" "}
                    <span style={{ color: "#9a9a9a" }}> ({cart.quantity } {t('Item')}) </span>
                  </p>
                </Col>
                <Col lg="6">
                  <p>{(cart.total>0 ? cart.total  : '0')} KWD</p>
                </Col>
              </Row>
              <Row style={{ marginTop: "3%" }}>
                <Col lg="6">
                  <p className="main-title-summary">{t('Shipping')}</p>
                  <p style={{ color: "#9a9a9a" }}>{t('Standart Delivery')}</p>
                </Col>
                <Col lg="6">
                  <p>{cart.shipmentTotal > 0 ? cart.shipmentTotal : 'Free'}</p>
                </Col>
              </Row>
              <Row>
                <hr />
                <Col>
                  <p className="main-title-summary">{t('Total')}</p>
                </Col>
                <Col>
                  <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                    {(cart.total>0 ? cart.total + cart.shipmentTotal : '0')} KWD
                  </p>
                </Col>
              </Row>
              <Row>
                <Link to={`/shipment`}>
                  <Button type="primary">{t('Checkout')}</Button>
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
        extra={ <Link to="/"> <Button type="primary">{t('Shop Now')}</Button> </Link>}
      />
      )}
      <MainFooter />
    </div>
  );
};

export default Cart;
