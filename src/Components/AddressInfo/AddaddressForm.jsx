import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Form, Input, message } from "antd";
import axios from "axios";
import Heading from "../Heading/index";
import Container from "react-bootstrap/Container";
import './index.css';
import Header from '../Header';
import MainFooter from '../Footer';

const AddaddressForm = () => {
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [street, setStreet] = useState("");
    const [building, setBuilding] = useState("");
    const [block, setBlock] = useState("");
    const { user, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
  const { Item } = Form;

    const handelAdd = async () =>{
      try {
        const {
          data: { message: msg},
        } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/address`,
          {
            city,
            area,
            street,
            building,
            block,
          },
          {
            headers: { token: `Bearer ${token}` },
          }
        );
        message.success(msg);
        navigate("/addressInfo");
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.error(msg);
      }
    }


  return (
    <><Header /><Container fluid style={{ marginTop: "3%" }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Account</Breadcrumb.Item>
        <Breadcrumb.Item active>Address Information</Breadcrumb.Item>
      </Breadcrumb>
      <div className="Auth-form-container accountInfo-form">
        <Heading heading="Address Information" />
        <Form
          name="basic"
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
            <div className="form-group mt-3">
              <label>City</label>
              <Item
                className="form-control mt-1"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                rules={[
                  {
                    type: "text",
                    message: "The input is not valid city address!",
                  },
                  {
                    required: true,
                    message: "Please input your City",
                  },
                ]}
              >
                <Input />
              </Item>
            </div>

            <div className="form-group mt-3">
              <label>Area</label>
              <Item
                name="Area"
                className="form-control mt-1"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                rules={[
                  {
                    type: "text",
                    message: "The input is not valid Area name!",
                  },
                  {
                    required: true,
                    message: "Please input your Area name!",
                  },
                ]}
              >
                <Input />
              </Item>
            </div>

            <div className="form-group mt-3">
              <label>Street</label>
              <Item
                name="street"
                className="form-control mt-1"
                value={street}
                placeholder="Street 75"
                onChange={(e) => setStreet(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your Street name!",
                  },
                ]}
              >
                <Input />
              </Item>
            </div>
            <div className="block-building-holder">

              <div className="form-group mt-3">
                <label>Block</label>
                <Item
                  name="Block"
                  className="form-control mt-1"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  rules={[
                    {
                      type: "text",
                      message: "The input is not valid Block name!",
                    },
                    {
                      required: true,
                      message: "Please input your Block name!",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </div>

              <div className="form-group mt-3">
                <label>House/Building No</label>
                <Item
                  name="building"
                  className="form-control mt-1"
                  value={building}
                  placeholder="Street 75"
                  onChange={(e) => setBuilding(e.target.value)}
                  rules={[
                    {
                      required: true,
                      message: "Please input your building name!",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </div>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#0F6AD0" }}
                onClick={() => handelAdd()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </Form>
      </div>
    </Container><MainFooter /></>
  );
};

export default AddaddressForm;
