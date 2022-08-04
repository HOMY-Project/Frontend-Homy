import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Form, Input, message } from "antd";
import axios from "axios";
import Heading from '../Heading/index';
import "../SignIn/index.css";
import "./index.css";

const AccountInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhoneNum] = useState(user.phone);
  const [edit, isEdit] = useState(true); 

  const tokenVal = document.cookie
  .split('; ')
  .find((row) => row.startsWith('token='))
  ?.split('=')[1];


  const editInfo = async () => {
    try {
      const {
        data : { message: verifyMessage },
      } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/update`, {
        name,
        email,
        phone,
      }, {
        headers: { token: `Bearer ${tokenVal}`
       } });
       isEdit(true);
      message.success(verifyMessage);
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };
  
  const { Item } = Form;

  return (
    <div className="Auth-form-container accountInfo-form">
      <Heading heading="Account Information"/>
      <Form
        name="basic"
        labelCol={{
          span: 20,
        }}
        wrapperCol={{
          span: 25,
        }}
        className="Auth-form"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        disabled={edit}
     >
        <div className="Auth-form-content">
          <div className="form-group mt-3">
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

          <div className="form-group mt-3">
            <label>Email address</label>
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

          <div className="form-group mt-3">
            <label>Phone Number</label>
            <Item
              name="phone"
              className="form-control mt-1"
              value={phone}
              placeholder="+965"
              onChange={(e) => setPhoneNum(e.target.value)}
              disabled={edit}
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

          {edit ? ( 
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#0F6AD0" }}
                onClick={() => isEdit(false)}
              >
                Edit Account
              </button>
            </div>
          ) : ( 
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#0F6AD0" }}
                onClick={() => editInfo()}
              >
                Save Changes
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#0F6AD0" }}
              >
                Change Password
              </button>
            </div>
              )}
        </div>
      </Form>
    </div>
  );
};

export default AccountInfo;
