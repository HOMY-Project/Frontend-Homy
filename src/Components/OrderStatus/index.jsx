import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setOrder } from "../../Redux/features/singleOrderSlice";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './index.css';
import Header from '../Header';
import MainFooter from '../Footer';

const OrderStatus = () => {
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNo] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSingleOrder = async (e) => {
    e.preventDefault();
    try {
      const { data: { data  } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/single-order`
      , { email, orderNumber });
      dispatch(setOrder(data));
      navigate('/singleOrder');
    } catch(err){
      console.error(err);
    }
  };
  
  return (
    <><Header /><Container fluid style={{ marginTop: '3%' }} className="checkOrderContainer">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Account</Breadcrumb.Item>

      </Breadcrumb>
      <p>To track your order please enter your Order ID in the box below and press the "Check" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
      <Form style={{ marginTop: "2%" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Order Number</Form.Label>
          <Form.Control type="text" placeholder="Enter Order Number" value={orderNumber} onChange={(e) => setOrderNo(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ backgroundColor: '#0F6AD0' }} onClick={(e) => getSingleOrder(e)}>
          Check
        </Button>
      </Form>
    </Container><MainFooter /></>
  );
}

export default OrderStatus;