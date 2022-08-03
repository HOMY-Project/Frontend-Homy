import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { CheckCircleFilled } from "@ant-design/icons";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import Heading from "../Heading/index";
import { message } from "antd";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import "./index.css";

const { Meta } = Card;

function ProductInfo() {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const productId = window.location.href.split("/")[6];

  const albums = [
    "https://i.postimg.cc/vTQMSNyv/Rectangle-109.png",
    "https://i.postimg.cc/NfjB6Sps/Rectangle-108.png",
    "https://i.postimg.cc/Y9xBgzFL/Rectangle-107.png",
    "https://i.postimg.cc/J7PWzKm9/Rectangle-106.png",
  ];
  const newAlbums = albums.map((item) => item);
  console.log(newAlbums, 'newAlbums')

  // receive array of albums then convert items to object with original and thumbnail keys and img values
  // then push the object to images array

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  console.log(images, 'images');
  albums.forEach(album => images.push(Object(album)));
  console.log(images, 'images after pushing');

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProducts = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${productId}`,
          {
            cancelToken: source.token,
          }
        );
        setProduct(data);
        console.log(data, "data");
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
  }, []);

  //increase counter
  const increase = () => {
    setQuantity(count => count + 1);
  };
 
  //decrease counter
  const decrease = () => {
    setQuantity(count => count - 1);
  };
 
  return (
    <div className="productInfoCard-holder">
      <Container fluid>
        {product.length &&
          product.map(({ id, name, price, description, brand, albums, quick_overview }) => {
            return (
              <>
                {/* {images.push(albums)} */}
                <Breadcrumb style={{ marginBottom: "4%" }}>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Smart Lighting</Breadcrumb.Item>
                  <Breadcrumb.Item active>{name}</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                  <Col>
                    <ImageGallery items={images} thumbnailPosition="left" />
                  </Col>
                  <Col>
                    <div>
                      <Card bordered={false}>
                        <Meta
                          title={name}
                          description={"brand" + " : " + brand}
                        />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "2%",
                            marginTop: "2%"
                          }}
                        >
                          <span style={{ marginRight: "2%", fontSize: "16px", fontWeight: "bold"}}>In Stock</span>
                          <CheckCircleFilled />{" "}
                        </div>
                        <hr />
                        <div className="price-holder">
                          <p className="price">{price} KWD</p>
                        </div>
                        <div className="quantity-holder">
                          <p style={{ marginRight: "3%", fontWeight: "bold" , fontSize: "17px" }}>Quantity</p>
                          <InputGroup className="mb-3">
                            <Button
                              variant="outline-secondary"
                              id="button-addon1"
                              onClick={() => increase()}
                            >
                              +
                            </Button>
                            <Form.Control
                              className="quantityInput"
                              aria-label="Example text with button addon"
                              aria-describedby="basic-addon2"
                              disabled
                              value={quantity}
                            />
                            <Button
                              variant="outline-secondary"
                              id="button-addon2"
                              onClick={() => decrease()}
                            >
                              -
                            </Button>
                          </InputGroup>
                        </div>
                        <div className="productInfo-btns">
                          <Button variant="primary" size="lg" className="addToCart">
                            Add to Cart{" "}
                          </Button>
                          <Button variant="primary" size="lg" className="buyNow">
                            Buy Now{" "}
                          </Button>
                        </div>
                        <hr />
                        <div>
                          <h4 style={{ color: "#18181A", fontSize: "16px", fontWeight: "bold" }}>Quick Overview</h4>
                          <p className="quickOverview">{quick_overview}</p>
                        </div>
                      </Card>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Heading heading="Product Description" />
                  <p>{description}</p>
                </Row>
                <Row>
                  <Heading heading="Recommended Products" />
                </Row>
              </>
            );
          })}
      </Container>
    </div>
  );
}

export default ProductInfo;
