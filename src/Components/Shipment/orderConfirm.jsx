import React, { useState } from "react";
import { CloseOutlined, SmileOutlined, EditFilled } from "@ant-design/icons";
import {
  Container,
  Col,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Button, Steps, message, Popconfirm, notification, Modal, Breadcrumb } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  removeItem,
} from "../../Redux/features/cartSlice";
import { setBill } from "../../Redux/features/singleOrderSlice";
import "../Order/index.css";
import "./index.css";
import paymentImg from "../../assets/payment.jpg";

const OrderConfirm = () => {
  const { bill } = useSelector((state) => state.singleOrder);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [name, setName] = useState(bill.name);
  const [email, setEmail] = useState(bill.email);
  const [phone, setphone] = useState(bill.phone);
  const [city, setCity] = useState(bill.addresses[0]);
  const [area, setArea] = useState(bill.addresses[1]);
  const [street, setStreet] = useState(bill.addresses[2]);
  const [building, setBuilding] = useState(bill.addresses[3]);
  const [block, setBlock] = useState(bill.addresses[4]);
  const [payment, setPayment] = useState(bill.payment);
  const { products, quantity, total } = useSelector((state) => state.cart);

  const { Step } = Steps;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editBill = async (e) => {
      e.preventDefault();
    try{
        dispatch(setBill(        
          {
          name,
          email,
          phone,
          addresses: [city, area, street, block, building],
          products: bill.products,
          payment,
          orderNumber: bill.orderNumber,
          amount: bill.amount,
        }));
        setIsModalVisible(false);
        message.success("Bill updated successfully");
    }catch(err){
        message.error(err);
    }
  };
  
  const handelShipment = async () => {
    try {
      const {
        data: { message: msg, data },
      } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order`, bill);
      message.success(msg);
      console.log(data, "data");
      notification.open({
        message: "Order Confirmed",
        description: { msg },
        icon: (
          <SmileOutlined
            style={{
              color: "#108ee9",
            }}
          />
        ),
        placement: "top",
      });
      navigate("/")
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
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
      <Container fluid style={{ marginTop: "3%" }} className="order-holder">
      <Breadcrumb style={{ marginBottom: "4%"}}>
            <Breadcrumb.Item>
              <a href="/">{t('Home')}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{t('Shopping Cart')}</a>
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
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {t("Checkout")}
                </h3>
              </div>
              <hr style={{ color: "#ccc" }} />
              <Col lg="12" md="12" sm="12">
                <div className="shippingInfo">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ fontSize: "17px", fontWeight: "bold" }}>
                      {t("Shipping")}
                    </h3>
                    <Button type="default" style={{ color: "#40A9FF",fontSize:'20px', backgroundColor:'transparent', borderColor:'transparent' }} onClick={showModal}>
                      <EditFilled />
                    </Button>
                  </div>
                  <hr style={{ color: "#ccc" }} />
                  <div className="shipping">
                    <p>{t("Full Name")}: {bill?.name}</p>
                    <p>{t("Email-address")}: {bill?.email}</p>
                    <p>{t("Phone Number")}: {bill?.phone}</p>
                    {bill?.addresses.map((address, index) => (
                      <p key={index}> {address}</p>
                    ))}

                    <Modal
                      title="Update Bill"
                      visible={isModalVisible}
                      onOk={editBill}
                      onCancel={handleCancel}
                    >
                      <Form style={{ marginTop: "2%" }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={phone}
                            onChange={(e) => setphone(e.target.value)}
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
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Payment</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Building No"
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                        </Form.Group>
                      </Form>
                    </Modal>
                  </div>
                </div>
              </Col>
              <Col lg="12" md="12" sm="12" style={{marginTop: "3%" }}>
                <div>
                  <div className="shippingInfo">
                    <h3 style={{ fontSize: "17px", fontWeight: "bold" }}>
                      {t("Payment Method")}
                    </h3>
                    <hr style={{ color: "#ccc" }} />
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
                        {bill.payment}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg="5" md="4" sm="12">
            <Container className="orderSummary">
            <h3 style={{ marginBottom: "5%"}}>{t('Order Review')}</h3>
              <p>Order No : {bill.orderNumber}</p>
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
                            console.log(e);
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
                          <p>{t("Qty")}: {product.quantity}</p>
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
                  <p>Free</p>
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
                <Button type="primary" onClick={(e) => handelShipment(e)}>
                 {t("Complete Purchase")}
                </Button>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderConfirm;
