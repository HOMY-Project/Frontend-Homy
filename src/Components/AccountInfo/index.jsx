import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import {  Container } from 'react-bootstrap';
import { Form, Input, message, Breadcrumb } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Heading from "../Heading/index";
import "../SignIn/index.css";
import "./index.css";

const AccountInfo = () => {
  const { user, token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNum] = useState("");
  const [edit, isEdit] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    const { name, email, phone } = user;
    setName(name);
    setEmail(email);
    setPhoneNum(phone);
  }, []);

  const editInfo = async () => {
    try {
     await axios.put(
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
      isEdit(true);
      message.success(
        t("accountInfo.success")
      );
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
    <Container fluid style={{ marginTop: "3%" }} className="order-holder">
        <Breadcrumb style={{ marginBottom: "4%"}}>
            <Breadcrumb.Item>
              <a href="/">{t('Home')}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{t('Account')}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{t('Account Information')}</a>
            </Breadcrumb.Item>
        </Breadcrumb>
        <div className="Auth-form-container accountInfo-form">
        <Heading heading={t("Account Information")} />
        <Form
          name="basic"
          initialValues={user}
          labelCol={{
            span: 20,
          }}
          wrapperCol={{
            span: 25,
          }}
          className="Auth-form"
          autoComplete="off"
          disabled={edit}
        >
          <div className="Auth-form-content">
            <div className="form-group mt-3">
              <label>{t("Full Name")}</label>
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
              <label>{t("Email-address")}</label>
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
              <label>{t("Phone Number")}</label>
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
                  {t("Edit Account")}
                </button>
              </div>
            ) : (
              <div className="d-grid mt-3">
                <div className="edit-btns-holder">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#0F6AD0", marginRight: "2%" }}
                    onClick={() => editInfo()}
                  >
                    {t("Save Changes")}
                  </button>
                  <Link to="/changePassword">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#fff",
                      color: "#0F6AD0",
                      borderColor: "#0F6AD0",
                    }}
                  >
                    {t("Change Password")}
                  </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Form>
      </div>
      </Container>
  );
};

export default AccountInfo;
