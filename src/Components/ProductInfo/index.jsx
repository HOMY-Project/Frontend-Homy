import React, { useState, useEffect } from 'react';
import { Card, Button } from "antd";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { StarFilled } from '@ant-design/icons';
import axios from "axios";
import Heading from "../Heading/index";
import { message } from "antd";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const { Meta } = Card;

function ProductInfo() {
    const [product, setProduct] = useState([]);
    const productId = window.location.href.split('/')[6];

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getProducts = async () => {
          const url = `/api/v1/product/${productId}`;
          try {
            const { data: { data } } = await axios.get(url, { cancelToken: source.token });
            console.log(data, 'data');
            setProduct(data);
          } catch ({
            response: {
              data: { message: msg },
            },
          }) {
            message.warning(msg);
          }
        };
        getProducts();
        return () => {
          source.cancel();
        };
      },[]);

  return (
    <Container fluid>
    {product !== undefined ? product.forEach(({ id , name, price, description, brand }) => {
        return(
            <>
            <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item >Smart Lighting</Breadcrumb.Item>
            <Breadcrumb.Item active>{name}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col>1 of 3</Col>
                <Col xs={6}>

                </Col>
                <Col>3 of 3</Col>
            </Row><Row>
                    <Heading heading="Product Description" />
                    <p>{description}</p>
                </Row><Row>
                    <Heading heading="Recomended Products" />
                </Row>
            </>
        )  
    }): [] }
  </Container>
    // <div className="productInfo">
    //   <Card
    //     bordered={false}
    //     cover={
    //       <img
    //         alt="example"
    //         src="https://i.postimg.cc/0NfwBLRt/Camera-uta6i-EV-1.png"
    //       />
    //     }
    //   >
    //     <Meta
    //       title="Xiaomi Motion-Activated Night Light"
    //       description="www.instagram.com"
    //     />
    //     <div
    //       style={{ display: "flex", alignItems: "center", marginBottom: "2%" }}
    //     >
    //       <StarFilled /> <span style={{ marginLeft: "2%" }}>5.0</span>
    //     </div>
    //     <div className="price-holder">
    //       <p className="price">4.00 KWD</p>
    //       <p className="discount">4.00 KWD</p>
    //     </div>
    //     <div className="d-grid gap-2">
    //       <Button variant="primary" size="lg">
    //         Add to Cart{" "}
    //       </Button>
    //     </div>
    //   </Card>
    // </div>
  );
}

export default ProductInfo;
