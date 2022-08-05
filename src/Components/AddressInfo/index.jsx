import React, { useState, useEffect } from "react";
import { Descriptions, message, Button } from "antd";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useSelector } from "react-redux";
import "./index.css";

const AddressInfo = () => {
  const [address, setAddress] = useState([]);
  const { user, token } = useSelector((state) => state.auth);

  console.log(address, "address");
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getAddress = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/address`;
      try {
        const { data } = await axios.get(
          url,
          { cancelToken: source.token },
          {
            headers: { token: `Bearer ${token}` },
          }
        );
        setAddress(data ? data : []);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getAddress();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="AddressInfo-holder">
      <Container fluid style={{ marginTop: "3%" }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item active>Address Information</Breadcrumb.Item>
        </Breadcrumb>
        <Descriptions title="Address Information"       
        column={{
        xxl: 4,
        xl: 3,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}>
          <Descriptions.Item label="City">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Area">1810000000</Descriptions.Item>
          <Descriptions.Item label="Street">
            Hangzhou, Zhejiang
          </Descriptions.Item>
          <Descriptions.Item label="Block">empty</Descriptions.Item>
          <Descriptions.Item label="Building">
            No. 18, Wantang Road
          </Descriptions.Item>
          <Descriptions.Item label="">
            <div className="descriptions-btn">
              <Button type="primary">Edit Address</Button>
              <Button>Make it Default</Button>
              <Button danger>Delete</Button>
            </div>
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary" style={{ marginTop: "2%" }}> Add Address </Button>
      </Container>
    </div>
  );
};

export default AddressInfo;
