import React, { useState, useContext } from "react";
import LocaleContext from '../../translations/LocaleContext';
import { CloseOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Col,
  Form,
  Image,
  Row,
  InputGroup,
} from "react-bootstrap";
import { Button, Steps, message, Radio, Popconfirm, Breadcrumb } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../../Redux/features/cartSlice";
import { setBill } from "../../Redux/features/singleOrderSlice";
import "../Order/index.css";
import paymentImg from "../../assets/payment.jpg";
import { useTranslation } from "react-i18next";
import Header from '../Header';
import MainFooter from '../Footer';

const Shipment = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [block, setBlock] = useState("");
  const [payment, setPayment] = useState("Knet");
  const [validated, setValidated] = useState(false);
  const { products, quantity, total, shipmentTotal } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);

  const { Step } = Steps;

  const handelShipment = async (event) => {
    try {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
      dispatch(
        setBill({
          name,
          email,
          phone,
          addresses: [city, area, street, block, building],
          products: products.map((prod) => [prod.id, prod.quantity]),
          payment,
          orderNumber: uuidv4(),
          amount: total,
        })
      );
      navigate("/order-confirm");
    } catch (error) {
      message.error(error);
    }
  };

  const handelDeleteProductCart = async (productId) => {
    if (token) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/cart/${productId}`,
          { headers: { token: `Bearer ${token}` } }
        );
        dispatch(removeItem(productId));
        message.success("product deleted successfully");
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.error(msg);
      }
    } else {
      dispatch(removeItem(productId));
    }
  };
  return (
    <div>
      <Header />
        <Container fluid style={{ marginTop: "3%" }} className="order-holder">
          <Breadcrumb style={{ marginBottom: "4%"}}>
              <Breadcrumb.Item>
                <a href="/">{t('Home')}</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/cart">{t('Shopping Cart')}</a>
              </Breadcrumb.Item>
          </Breadcrumb>        
          <Steps current={1} style={{ marginBottom: "5%"}}>
            <Step title={t("Review Order")} />
            <Step title={t("Shipping & Payment")} />
            <Step title={t("Confirm Order")} />
          </Steps>
          <Row>
            <Col lg="7" md="8" sm="12">
              <Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2%",
                  }}
                >
                  <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {t("Checkout")}
                  </h3>
                  {!token && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: "40%",
                      }}
                    >
                      <p style={{ marginBottom: "0", marginLeft: "2%" }}>
                        {t("Existing customer?")}
                      </p>
                      <Link to="/signin">
                        {" "}
                        <Button
                          style={{
                            color: "#1890FF !important",
                            borderColor: "#1890FF !important",
                          }}
                        >
                          {t("signIn")}
                        </Button>{" "}
                      </Link>
                    </div>
                  )}
                </div>
                <hr style={{ color: "#ccc" }} />
                <Col lg="7" md="8" sm="12">
                  <div>
                    <div className="shippingInfo">
                      <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                        {t("Shipping")}
                      </h3>
                      <hr style={{ color: "#ccc" }} />
                      <div>
                        <Form style={{ marginTop: "2%" }} noValidate validated={true} onSubmit={handelShipment}>
                          <Form.Group
                            className="mb-3"
                            controlId="validationCustom03"
                            hasValidation
                          >
                            <Form.Label>{t("Full Name")}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter full Name"
                              value={name}
                              onChange={(e) => setname(e.target.value)}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid full Name.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="validationCustom03"
                            hasValidation
                          >
                            <Form.Label>{t("Email-address")}</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid email.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            hasValidation
                            className="mb-3"
                            controlId="validationCustom03"
                          >
                            <Form.Label>{t("Phone Number")}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Order Number"
                              value={phone}
                              onChange={(e) => setphone(e.target.value)}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid state.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="validationCustom03"
                            hasValidation
                          >
                            <Form.Label>{t("City")}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group
                            hasValidation
                            className="mb-3"
                            controlId="validationCustom03"                   
                            >
                            <Form.Label>{t("Area")}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Area"
                              value={area}
                              onChange={(e) => setArea(e.target.value)}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid Area.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="validationCustom03"      
                            hasValidation
                          >
                            <Form.Label>{t("Street")}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Street"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid street.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="validationCustom03"   
                            hasValidation
                          >
                            <Form.Label>{t("Block")}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Block"
                              value={block}
                              onChange={(e) => setBlock(e.target.value)}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid block.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            hasValidation
                            className="mb-3"
                            controlId="validationCustom03"   
                          >
                            <Form.Label>{t("Building")}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Building No"
                              value={building}
                              onChange={(e) => setBuilding(e.target.value)}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please choose a Building NO.
                            </Form.Control.Feedback>
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
                        {t("Payment Method")}
                      </h3>
                      <hr style={{ color: "#ccc" }} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Radio.Group
                          onChange={(e) => setPayment(e.target.value)}
                          value={payment}
                        >
                          <Radio defaultChecked value="Knet">
                            Knet Payment
                          </Radio>
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
              <h3 style={{ marginBottom: "5%"}}>{t('Order Review')}</h3>
                <hr />
                {products.map((product) => (
                  <Row style={{ marginBottom: "2%" }}>
                    <Col sm="3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col sm="9">
                      <Row>
                        <Col sm="10">
                          <p style={{ fontWeight: "bold" }}>{product.name}</p>
                        </Col>
                        <Col sm="2">
                          <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => {
                              handelDeleteProductCart(product.id);
                            }}
                            onCancel={(e) => {
                              message.error("something went wrong");
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
                      <Row style={{ alignItems: "center " }}>
                        <Col sm="5">
                          <p>{product.price * product.quantity} KWD</p>
                        </Col>
                        <Col sm="5">
                          <div className="quantity-holder">
                            <InputGroup className="mb-3">
                              <Button
                                variant="outline-secondary"
                                id={locale === 'en' ? 'button-addon1' : 'button-addon2'}
                                onClick={() =>
                                  dispatch(incrementQuantity(product.id))
                                }
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
                                id={locale === 'en' ? 'button-addon2' : 'button-addon1'}
                                onClick={() =>
                                  dispatch(decrementQuantity(product.id))
                                }
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
                      {t("Item Subtotal")}{" "}
                      <span style={{ color: "#9a9a9a" }}>
                        {" "}
                        ({quantity} {t("Item")}){" "}
                      </span>
                    </p>
                  </Col>
                  <Col lg="6">
                    <p>{total} KWD</p>
                  </Col>
                </Row>
                <Row style={{ marginTop: "3%" }}>
                  <Col lg="6">
                    <p className="main-title-summary">{t("Shipping")}</p>
                    <p style={{ color: "#9a9a9a" }}>{t("Standart Delivery")}</p>
                  </Col>
                  <Col lg="6">
                    <p>{shipmentTotal > 0 ? shipmentTotal : 'Free'}</p>
                  </Col>
                </Row>
                <Row>
                  <hr />
                  <Col>
                    <p className="main-title-summary">{t("Total")}</p>
                  </Col>
                  <Col>
                    <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                      {total < 1 ? "0" : total} KWD
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Form>
                <Button type="primary" onClick={handelShipment} >
                    {t("Confirm Order Now")}
                </Button>
                  </Form>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      <MainFooter />
    </div>
  );
};

export default Shipment;
