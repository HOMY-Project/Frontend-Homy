import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";
import "../SignIn/index.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");

  const signup = async () => {
    try {
      const {
        data: { message: verifyMessage },
      } = await axios.post("/api/signup", {
        name: fullName,
        email,
        password,
        PhoneNum,
      });
      message.success(`Welcome ${fullName}, ${verifyMessage}`);
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
    <div className="Auth-form-container signUp-form">
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
          <h3 className="Auth-form-title">Sign Up</h3>

          <div className="form-group mt-3">
            <label>Full Name</label>
            <Item
              className="form-control mt-1"
              name="fullName"
              value={fullName}
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
            <label>Password</label>
            <Item
              name="Password"
              className="form-control mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  // password Should be combination of numbers & alphabets and one special character
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
                  message:
                    "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
                },
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
            <label>Phone Number</label>
            <Item
              name="phone"
              className="form-control mt-1"
              value={PhoneNum}
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
              onClick={() => signup()}
            >
              Sign Up
            </button>
          </div>

          <div className="d-grid gap-2 mt-3">
            <hr />
            <p className=""> Already Have an Account?</p>
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
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
