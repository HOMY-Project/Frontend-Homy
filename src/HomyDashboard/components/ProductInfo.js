import React, { useState, useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Card, message } from "antd";
import axios from "axios";

const ProductInfo = ({ product }) => {
    const { Meta } = Card;
    const [prod, setProduct ] = useState([])

  useEffect(() => {
      const source = axios.CancelToken.source(); 
      const getProduct = async () => {
        try {
          const {
            data: { data },
          } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${product[0]}`, {
            cancelToken: source.token,
          });
          setProduct(data);
        } catch ({
          response: {
            data: { message: msg },
          },
        }) { 
          message.warning(msg);
        }
      };
      getProduct();
      return () => {
        source.cancel();
      };
    }, []);

  return (
      <Row style={{ alignItems: "center", marginTop: "2%"}}>
          <Col md={3} xs={12}>
            <Image src={prod[0]?.image} alt={prod[0]?.name} fluid rounded />
          </Col>
          <Col md={3} xs={12}>
            <p>{prod[0]?.name}</p>
          </Col>
          <Col md={3} xs={12}>
            <p className="quantity-holder">
              {product[1]} Item
            </p>
          </Col>
          <Col md={3} xs={12}>
              <p style={{ fontWeight: "bold" , fontSize: "15px" }}> {prod[0]?.price} KWD</p>
          </Col>
    </Row>
  );
};

export default ProductInfo;
