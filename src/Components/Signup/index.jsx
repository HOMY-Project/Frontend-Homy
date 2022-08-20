import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../Redux/features/authSlice';
import { Form, Input, message } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../SignIn/index.css";
import Header from '../Header';
import MainFooter from '../Footer';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhoneNum] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const signup = async () => {
    try {
      const {
        data: { data, message: verifyMessage, token },
      } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/signup`, {
        name,
        email,
        password,
        phone,
      });
      dispatch(setUser(data));
      dispatch(setToken(token));

      message.success(`Welcome ${name}, ${verifyMessage}`);
      navigate("/");
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };

  const { Item } = Form;
  const { Password } = Input;
  return (
    <><Header /><div className="Auth-form-container signUp-form">
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
        onFinish={() => signup()}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{t('signUp')}</h3>

          <div className="form-group mt-3">
            <label>{t('Full Name')}</label>
            <Item
              className="form-control mt-1"
              name="fullName"
              value={phone}
              onChange={(e) => setFullName(e.target.value)}
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
            <label>{t('Email-address')}</label>
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
            <label>{t('Password')}</label>
            <Item
              name="Password"
              className="form-control mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your Passsword",
                },
              ]}
              hasFeedback
            >
              <Password />
            </Item>
          </div>

          <div className="form-group mt-3">
            <label>{t('Phone Number')}</label>
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

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "#0F6AD0" }}
              onClick={() => signup}
            >
              {t('signUp')}
            </button>
          </div>

          <div className="d-grid gap-2 mt-3">
            <hr />
            <p className=""> {t('Already Have an Account?')}</p>
            <Link to="/signIn" className="new-customer-a">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#fff",
                  color: "#0F6AD0",
                  width: "100%",
                }}
              >
                {t('signIn')}
              </button>
            </Link>
          </div>
        </div>
      </Form>
    </div><MainFooter /></>
  );
};

export default SignUp;
