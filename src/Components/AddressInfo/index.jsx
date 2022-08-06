import React, { useState, useEffect } from "react";
import { Descriptions, message, Button, Modal} from "antd";
import LoadingSpinner from '../LoadingSpinner';
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import "./index.css";

const AddressInfo = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const userId = user.id;
  const { confirm } = Modal;

  const handelDeleteAddress = async (id) =>{
    console.log( token );
    try {
      const { data: { message : msg } } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address`, {id} ,{ headers: { token: `Bearer ${token}` } });
      message.success(msg);
      setAddress((prev) => prev.filter((item) => item.id !== id));
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  }
  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Delete address',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to delete this address?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => handelDeleteAddress(id),
    });
  };
  const handleDefault = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address/default`, {id}, { headers: { token: `Bearer ${token}` } });

      setAddress((prevAddress) => prevAddress.map((item) => {
        if (item.id === id) {
          (item.default_address = !item.default_address);
        }
        return item;
      }));
      console.log('update address');
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };
  const handelEdit = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address`,
      {
        headers: { token: `Bearer ${token}` },
      }, {id});

      setAddress((prevAddress) => prevAddress.map((item) => {
        if (item.id === id) {
          (item.edit = !item.edit);
        }
        return item;
      }));
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  }

  useEffect(() => {
    // const source = axios.CancelToken.source();
    const getAddress = async () => {
      try {
        setLoading(true);
        const { data: { data } } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address`,
          // { cancelToken: source.token },
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
    // return () => {
    //   source.cancel();
    // };
  }, []);

  return (
    <div className="AddressInfo-holder">
    
      <Container fluid style={{ marginTop: "3%" }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item active>Address Information</Breadcrumb.Item>
        </Breadcrumb>

        {loading ? (
        <div style={{display: 'flex', justifyContent: 'center' , alignItems: 'center' , height : '200px'}}>
          <LoadingSpinner />
        </div>
        ) : (
          address.length > 0 ? (
            <div className="AddressInfo-container">
              {address.map((item) => (
                <Descriptions title="Address Information"
                key={item.id}
                style={{ marginBottom: "2%" }}
                column={{
                  xxl: 4,
                  xl: 3,
                  lg: 3,
                  md: 3,
                  sm: 2,
                  xs: 1,
                }}>
                  <>
                  <Descriptions.Item label="City">{item.city}</Descriptions.Item><Descriptions.Item label="Area">{item.area}</Descriptions.Item><Descriptions.Item label="Street">
                      {item.street}
                    </Descriptions.Item><Descriptions.Item label="Block">{item.block}</Descriptions.Item><Descriptions.Item label="Building">
                        {item.building}
                      </Descriptions.Item><Descriptions.Item label="">
                        <div className="descriptions-btn">
                          <Button type="primary" onClick={() => handelEdit(item.id)}>Edit Address</Button>
                          <Button onClick={() => handleDefault(item.id)}>Make it Default</Button>
                          <Button danger onClick={() => showDeleteConfirm(item.id)}>Delete</Button>
                        </div>
                      </Descriptions.Item>
                  </>
                </Descriptions>
              ))}
            </div> ) :
            (
              <div className="AddressInfo-container">
              <div className="AddressInfo-item">
                <Alert key='primary' variant='primary'>
                  <Alert.Heading style={{ fontWeight: 'bold' , fontSize: '18px'}}>You have no address</Alert.Heading>
              </Alert>
              </div>
            </div>
          )
      )}
        <Link to="/addAddress">
            <Button type="primary" style={{ marginTop: "2%" }}> Add Address </Button>
        </Link>
      </Container>
    </div>
  );
  
}

export default AddressInfo;
