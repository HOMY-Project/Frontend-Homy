import React, { useState, useEffect } from "react";
import { Container, Form, Alert } from "react-bootstrap";
import { Descriptions, message, Button, Modal, Popconfirm, Breadcrumb } from "antd";
import LoadingSpinner from "../LoadingSpinner";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./index.css";

const AddressInfo = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [block, setBlock] = useState("");
  const { user, token } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const userId = user.id;

  const showModal = (item) => {
    setCity(item.city);
    setArea(item.area);
    setStreet(item.street);
    setBuilding(item.building);
    setBlock(item.block);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handelDeleteAddress = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address/${id}`,
        { headers: { token: `Bearer ${token}` } }
      );
      setAddress((prev) => prev.filter((item) => item.id !== id));
      message.success("address deleted successfully");
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };

  const handleDefault = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address/default`,
        { id },
        { headers: { token: `Bearer ${token}` } }
      );

      setAddress((prevAddress) =>
        prevAddress.map((item) => {
          if (item.id === id) {
            item.default_address = !item.default_address;
          }
          return item;
        })
      );
      message.success("address is updated successfully");
      setIsModalVisible(false);
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };

  const handelEdit = async ( id ) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address`,
        { city, area, street, block, building, id },
        {
          headers: { token: `Bearer ${token}` },
        }
      );
        message.success("address is updated successfully");

    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address`,
          {
            headers: { token: `Bearer ${token}` },
          }
        );
        setAddress(data);
        setLoading(false);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
        setLoading(false);
      }
    };
    getAddress();
  }, []);

  return (
    <div className="AddressInfo-holder">
      <Container fluid style={{ marginTop: "3%" }}>
        <Breadcrumb style={{ marginBottom: "4%"}}>
            <Breadcrumb.Item>
              <a href="/">{t('Home')}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{t('Account')}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{t('Addresses Information')}</a>
            </Breadcrumb.Item>
        </Breadcrumb>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <LoadingSpinner />
          </div>
        ) : address.length > 0 ? (
          <div className="AddressInfo-container">
            {address.map((item) => (
              <Descriptions
                title={t("Address Information")}
                key={item.id}
                style={{ marginBottom: "2%" }}
                column={{
                  xxl: 4,
                  xl: 3,
                  lg: 3,
                  md: 3,
                  sm: 2,
                  xs: 1,
                }}
              >
                <>
                  <Descriptions.Item label={t("City")}>
                    {item.city}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Area")}>
                    {item.area}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Street")}>
                    {item.street}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Block")}>
                    {item.block}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Building")}>
                    {item.building}
                  </Descriptions.Item>
                  <Descriptions.Item label="">
                    <div className="descriptions-btn">
                      <Button type="primary" onClick={() => showModal(item)}>
                        {t("Edit Address")}
                      </Button>
                      <Modal
                        title={t("Update Address")}
                        visible={isModalVisible}
                        onOk={() => handelEdit(item.id)}
                        onCancel={handleCancel}
                      >
                        <Form style={{ marginTop: "2%" }}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>{t("City")}</Form.Label>
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
                            <Form.Label>{t("Area")}</Form.Label>
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
                            <Form.Label>{t("Street")}</Form.Label>
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
                            <Form.Label>{t("Block")}</Form.Label>
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
                            <Form.Label>{t("House/Building No")}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Building No"
                              value={building}
                              onChange={(e) => setBuilding(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Form>
                      </Modal>
                      <Button onClick={() => handleDefault(item.id)}>
                        {" "}
                        {item.default_address
                          ? t("Make it not Default")
                          : t("Make it Default")}
                      </Button>
                      <Popconfirm
                        title={t("Are you sure to delete this task?")}
                        onConfirm={() => {
                          handelDeleteAddress(item.id);
                        }}
                        onCancel={(e) => {
                          message.error("Click on No");
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger>{t("Delete")}</Button>
                      </Popconfirm>
                    </div>
                  </Descriptions.Item>
                </>
              </Descriptions>
            ))}
          </div>
        ) : (
          <div className="AddressInfo-container">
            <div className="AddressInfo-item">
              <Alert key="primary" variant="primary">
                <Alert.Heading style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {t("You have no address")}
                </Alert.Heading>
              </Alert>
            </div>
          </div>
        )}
        <Link to="/addAddress">
          <Button type="primary" style={{ marginTop: "2%" }}>
            {t("Add Address")}{" "}
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default AddressInfo;
