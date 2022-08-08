import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Rate,
  Progress,
  Comment,
  message,
  Select,
  Pagination,
} from "antd";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { CheckCircleFilled } from "@ant-design/icons";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import Heading from "../Heading/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import LoadingSpinner from "../LoadingSpinner";
import "./index.css";

const { Meta } = Card;

function ProductInfo() {
  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [newAlbums, setNewAlbums] = useState([]);
  const [sort, setSort] = useState("Recent");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState();
  const productId = window.location.href.split("/")[6];
  const { Option } = Select;

  const images = [];
  var obj = {};
  for (var i = 0; i < newAlbums.length; i++) {
    obj.original = newAlbums[i];
    obj.thumbnail = newAlbums[i];
    images.push(obj);
  }

  

  // const HandelSort = () => {
  //   if(sort === 'Recent'){
  //     product.sort((a, b) => b.id - a.id)
  //   }
  // }
  // const filterProducts = () => {
  //   let filteredProducts = products;
  //   if (searchWords.length !== 0)
  //     filteredProducts = filteredProducts.filter((product) =>
  //       product.name.toLowerCase().includes(searchWords.toLowerCase())
  //     );
  //   if (categorySelected !== 'All')
  //     filteredProducts = filteredProducts.filter(
  //       (product) => product.category === categorySelected
  //     );
  //   if (sort === 'Newest') filteredProducts.sort((a, b) => b.id - a.id);
  //   if (sort === 'Lowest') filteredProducts.sort((a, b) => a.price - b.price);
  //   if (sort === 'Highest') filteredProducts.sort((a, b) => b.price - a.price);

  //   return filteredProducts;
  // };
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProducts = async () => {
      const url = page
        ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${productId}?page=${page}`
        : `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${productId}`;
      try {
        setLoading(true);
        const {
          data: { data },
        } = await axios.get(url, {
          cancelToken: source.token,
        });
        setProduct(data);
        setNewAlbums(data[0].albums);
        setLoading(false);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
        setLoading(false);
      }
    };
    getProducts();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getReview = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${productId}/review`,
          {
            cancelToken: source.token,
          }
        );
        setReviews(data);
        setTotal(data[0].count);
        console.log(data, "reviews");
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getReview();
    return () => {
      source.cancel();
    };
  }, []);

  //increase counter
  const increase = () => {
    setQuantity((count) => count + 1);
  };

  //decrease counter
  const decrease = () => {
    setQuantity((count) => count - 1);
  };

  return (
    <div className="productInfoCard-holder">
      <Container fluid style={{ marginTop: "3%" }}>
        {product.length &&
          product.map(
            ({ id, name, price, description, brand, quick_overview }) => {
              return (
                <>
                  <Breadcrumb style={{ marginBottom: "4%" }}>
                    <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Smart Lighting</Breadcrumb.Item>
                    <Breadcrumb.Item active>{name}</Breadcrumb.Item>
                  </Breadcrumb>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                      }}
                    >
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <>
                      <Row>
                        <Col>
                          <ImageGallery
                            items={images}
                            thumbnailPosition="left"
                          />
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
                                  marginTop: "2%",
                                }}
                              >
                                <span
                                  style={{
                                    marginRight: "2%",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  In Stock
                                </span>
                                <CheckCircleFilled />{" "}
                              </div>
                              <hr />
                              <div className="price-holder">
                                <p className="price">{price} KWD</p>
                              </div>
                              <div className="quantity-holder">
                                <p
                                  style={{
                                    marginRight: "3%",
                                    fontWeight: "bold",
                                    fontSize: "17px",
                                  }}
                                >
                                  Quantity
                                </p>
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
                                    onClick={() =>
                                      quantity > 0 ? decrease() : 0
                                    }
                                  >
                                    -
                                  </Button>
                                </InputGroup>
                              </div>
                              <div className="productInfo-btns">
                                <Button
                                  variant="primary"
                                  size="lg"
                                  className="addToCart"
                                >
                                  Add to Cart{" "}
                                </Button>
                                <Button
                                  variant="primary"
                                  size="lg"
                                  className="buyNow"
                                >
                                  Buy Now{" "}
                                </Button>
                              </div>
                              <hr />
                              <div>
                                <h4
                                  style={{
                                    color: "#18181A",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Quick Overview
                                </h4>
                                <p className="quickOverview">
                                  {quick_overview}
                                </p>
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
                        <div>
                          <Heading heading="Customer Ratings" />
                        </div>
                        <Col>
                          <div className="left-rate">
                            <div style={{ display: "flex" }}>
                              <Rate disabled defaultValue={5} />
                              <p className="rate-text">4.6 out of 5</p>
                            </div>
                            <p>7363 customers ratings</p>
                            <div
                              style={{
                                width: 170,
                              }}
                            >
                              <Progress percent={90} size="small" />
                              <Progress percent={70} size="small" />
                              <Progress percent={30} size="small" />
                              <Progress percent={15} size="small" />
                              <Progress percent={5} size="small" />
                            </div>
                          </div>
                        </Col>
                        <Col xs={9}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <h6 style={{ fontWeight: "bold" }}>
                              Customers Comments
                            </h6>
                            <Select
                              defaultValue="Most Recent"
                              className="filter-select"
                              value={sort}
                              onChange={(value) => setSort(value)}
                            >
                              <Option value="Recent">Most Recent</Option>
                              <Option value="Latest">Latest</Option>
                            </Select>
                          </div>
                          <hr
                            style={{ borderTop: "1px solid rgba(0,0,0,.06)" }}
                          />
                          <div className="comment-holder">
                            {reviews.length > 0 ? (
                              reviews.map(
                                ({ createdat, name, comment, rate }) => {
                                  return (
                                    <>
                                      <Comment
                                        key={name}
                                        author={
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              marginBottom: "10%",
                                            }}
                                          >
                                            <p className="author-name">
                                              {name}
                                            </p>
                                            <span
                                              style={{
                                                color: "rgb(181 181 181)",
                                                fontSize: "14px",
                                                marginTop: "5%",
                                              }}
                                            >
                                              {createdat.split("T")[0]}
                                            </span>
                                          </div>
                                        }
                                        content={<p>{comment}</p>}
                                        datetime={
                                          <Rate disabled defaultValue={rate} />
                                        }
                                      />
                                      {total > 3 && (
                                      <div className="pagination-holder">
                                        <Pagination
                                          defaultCurrent={0}
                                          total={total}
                                          pageSize="3"
                                          current={page}
                                          onChange={(value) => setPage(value)}
                                        />
                                      </div>
                                      )}
                                    </>
                                  );
                                }
                              )
                            ) : (
                              <div className="AddressInfo-container">
                                <div className="AddressInfo-item">
                                  <Alert key="primary" variant="primary">
                                    <Alert.Heading
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                      }}
                                    >
                                      No Reviews Available{" "}
                                    </Alert.Heading>
                                  </Alert>
                                </div>
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Heading heading="Recommended Products" />
                      </Row>
                    </>
                  )}
                </>
              );
            }
          )}
      </Container>
    </div>
  );
}

export default ProductInfo;
