import React, { useState,useEffect } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Descriptions,
  Avatar,
  message,
  Input
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../Redux/features/authSlice';
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import axios from 'axios';

function Profile() {
  const [imageURL, setImageURL] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNum] = useState("");
  const [, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, permission, token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(permission, 'user');
  const { Item } = Form;

  useEffect(() => {
    const { name, email, phone } = user;
    setName(name);
    setEmail(email);
    setPhoneNum(phone);
  }, [user]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const editInfo = async () => {
    try {
    const {data : { data }} =  await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/update`,
        {
          name,
          email,
          phone,
        },
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      console.log(data, 'data edit');
      message.success('Your Info is saved successfully')
      dispatch(setUser(data));
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }finally{
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{user.name}</h4>
                  <p>{permission[0]?.role ? permission[0]?.role : 'Admin'}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]} style={{marginTop: '2%'}}>
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link" onClick={() => setIsModalVisible(true)}>{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Modal title="Edit Comment" onOk={editInfo} onCancel={() => setIsModalVisible(false)}  visible={isModalVisible}>
                <Form name="basic"
                  labelCol={{
                  span: 20,
                  }}
                  wrapperCol={{
                  span: 25,
                  }}
                  className="Auth-form"
                  autoComplete="off"
                >
                <div className="Auth-form-content">
                  <div className="form-group mt-3" style={{border: "none !important"}}>
                    <label>Full Name</label>
                        <Item
                          className="form-control mt-1"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          rules={[
                            {
                              type: "text",
                              message: "The input is not valid Full Name!",
                            },
                            {
                              required: true,
                              message: "Please input your Full Name",
                            },
                          ]}
                        >
                          <Input />
                        </Item>
                  </div>

                  <div className="form-group mt-3" style={{border: "none !important"}}>
                    <label>Email-address</label>
                    <Item
                      name="email"
                      className="form-control mt-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input />
                    </Item>
                  </div>

                  <div className="form-group mt-3" style={{border: "none !important"}}>
                    <label>Phone Number</label>
                    <Item
                      name="phone"
                      className="form-control mt-1"
                      value={phone}
                      placeholder="+965"
                      onChange={(e) => setPhoneNum(e.target.value)}
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone Number!",
                        },
                      ]}
                    >
                      <Input />
                    </Item>
                  </div>
                </div>
                </Form>                               
            </Modal>  
            {/* <p className="text-dark">
              {" "}
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).{" "}
            </p>
            <hr className="my-25" /> */}
            <Descriptions title="">
              <Descriptions.Item label="Full Name" span={3}>
                {user.name}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {user.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {user.email}
              </Descriptions.Item>
              <Descriptions.Item label="Role Name" span={3}>
                {permission[0]?.role ? permission[0]?.role : 'Admin'}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
