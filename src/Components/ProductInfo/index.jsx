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
  Modal,
  Form as AntForm,
  Input
} from "antd";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addWishlist } from "../../Redux/features/cartSlice";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { CheckCircleFilled, HeartOutlined, HeartFilled } from "@ant-design/icons";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import Heading from "../Heading/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form  from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import LoadingSpinner from "../LoadingSpinner";
import ProductCard from "../SuperDeals/ProductCard";
import "./index.css";

const { Meta } = Card;

function ProductInfo() {
  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [Recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [rate, setRate] = useState([]);
  const [reviewRate, setReviewRate]= useState(0)
  const [newAlbums, setNewAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [categoryName, setCategoryName ] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const productId = window.location.href.split("/")[6];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pro = product[0];
  const { Item } = AntForm;
  const { TextArea } = Input;
  const { t  } = useTranslation();


  const images = [];
  var obj = {};
  for (var i = 0; i < newAlbums.length; i++) {
    obj.original = newAlbums[i];
    obj.thumbnail = newAlbums[i];
    images.push(obj);
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCategoryName = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/categories/${productId}`,
          { cancelToken: source.token }
        );
        setCategoryName(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getCategoryName();
    return () => {
      source.cancel();
    };
  }, [productId]);
  
  const handelAddProduct = async (product) => {
    if (token && quantity > 0 && product) {
      const carts = [{ ...pro, quantity }];
      try {
        const {
          data: { message: msg },
        } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/cart`,
          { carts },
          { headers: { token: `Bearer ${token}` } }
        );
        dispatch(addProduct({ ...product, quantity }));
        message.success(msg);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    } else {
      return quantity > 0
        ? dispatch(addProduct({ ...product, quantity }))
        : message.error("please select quantity");
    }
  };

  const handelWishlist = async (product) => {
    if (token && product && isWishlist === false) {
      try {
        const {
          data: { message: msg },
        } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/wishlist`,
          { wishlists: [pro] },
          { headers: { token: `Bearer ${token}` } }
          );
          setIsWishlist(true)
          dispatch(addWishlist(product));
          message.success(msg);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    } else {
      return isWishlist === false
        ? dispatch(addWishlist({ ...product }))
        : message.warning("this product is already added");
    }
  };
  
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProducts = async () => {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${productId}`, {
          cancelToken: source.token,
        });
        setProduct(data);
        setNewAlbums(data[0].albums);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }finally {
        setLoading(false);
      }
    };
    getProducts();
    return () => {
      source.cancel();
    };
  }, [productId]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getReview = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${productId}/review?page=${page}`,
          {
            cancelToken: source.token,
          }
        );
        setReviews(data);
        setTotal(data[0]?.count);
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
  }, [page, isAdded, productId]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getRate = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${productId}/rate`,
          {
            cancelToken: source.token,
          }
        );
        setRate(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getRate();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getRecommendedPro = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${product[0]?.category_id}/recommended`,
          {
            cancelToken: source.token,
          }
        );
      setRecommended(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getRecommendedPro();
    return () => {
      source.cancel();
    };
  }, [product]);

  const PostComment = async () => {
    try {
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${productId}/review`
      , { comment, rate: reviewRate },  { headers: { token: `Bearer ${token}` } });

      setIsModalVisible(false);
      setIsAdded(!isAdded);
      message.success(msg);
    }catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  }
  //increase counter
  const increase = () => {
    setQuantity((count) => count + 1);
  }

 //decrease counter
 const decrease = () => {
  setQuantity((count) => count - 1);
};

const sortReviews = (value) =>{
  setReviews(reviews.sort((a, b) => {
    if (value === "Recent") {
      return Date.parse(a.createdat) - Date.parse(b.createdat);
    } else if (value === "Latest") {
      return Date.parse(b.createdat) - Date.parse(a.createdat);
    }
  }
  ))
}

  return (
    <div className="productInfoCard-holder">
      <Container fluid style={{ marginTop: "3%" }}>
        {product.length &&
          product.map((prod) => {
            return (
              <>
                <Breadcrumb style={{ marginBottom: "4%" }} >
                  <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item>{categoryName[0]?.name}</Breadcrumb.Item>
                  <Breadcrumb.Item active>{prod.name}</Breadcrumb.Item>
                </Breadcrumb>
                  <>
                    <Row>
                      <Col>
                        { images ? <ImageGallery items={images} 
                        thumbnailPosition="left" 
                        showPlayButton={false}
                        renderCustomControls={() => (
                          <div className="image-gallery-custom-action">
                              <button className="image-gallery-heart-holder" onClick={() => handelWishlist(prod)}> 
                              {isWishlist ? <HeartFilled style={{fontSize: '22px', color: "red"}}/> : <HeartOutlined style={{fontSize: '22px'}}/>} </button>
                          </div>
                        )}
                        /> : null}
                      </Col>
                      <Col>
                        <div>
                          <Card bordered={false}>
                            <Meta
                              title={prod.name}
                              description={"brand" + " : " + prod.brand}
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
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "2%",
                              }}
                            >
                              <Rate disabled defaultValue={rate[0]?.rate} />
                              <p
                                className="rate-text"
                                style={{ color: "#989898", marginBottom: "0" }}
                              >
                                {rate[0]?.count} rating
                              </p>
                            </div>
                            <hr />
                            <div className="price-holder">
                              <p className="price">{prod.price} KWD</p>
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
                                  style={{border: 'none !important'}}
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
                                onClick={() => {
                                  handelAddProduct(prod);
                                  setAdd(true);
                                }}
                              >
                                {add ? "added to Cart " : "add to Cart"}{" "}
                              </Button>
                              <Link to="/cart">
                                <Button
                                  variant="primary"
                                  size="lg"
                                  className="buyNow"
                                >
                                  Buy Now{" "}
                                </Button>
                              </Link>
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
                                {prod.quick_overview}
                              </p>
                            </div>
                          </Card>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Heading heading="Product Description" />
                      <p>{prod.description}</p>
                    </Row>
                    <Row>
                      <div>
                        <Heading heading="Customer Ratings" />
                      </div>
                      <Col>
                        <div className="left-rate">
                          <div style={{ display: "flex" }}>
                            <Rate disabled defaultValue={rate[0]?.rate} />
                            <p className="rate-text">
                              {rate[0]?.rate} out of 5
                            </p>
                          </div>
                          <p>{rate[0]?.count} customers ratings</p>
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
                          <div style={{ display: "flex", width: "28%", justifyContent: "space-between"}}>
                            <Select
                              className="filter-select"
                              placeholder="sort by retardate"
                              onChange={(value) => sortReviews(value)}
                            >
                              <Option value="Recent">Recent</Option>
                              <Option value="Latest">Latest</Option>
                            </Select>
                            <div className="addReviewBtn-holder"><Button type="primary" onClick={() => setIsModalVisible(true)}>Add Review</Button></div>         
                            <Modal title="Edit Comment" visible={isModalVisible} onOk={PostComment} onCancel={() => setIsModalVisible(false)}>
                                <AntForm name="basic"
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
                                    <label>{t("Comment")} </label>
                                    <Item className="form-control mt-1" name="name" value={comment} onChange={(e) => setComment(e.target.value)}
                                      rules={[
                                      {
                                      type: "text",
                                      message: "The input is not valid Comment!",
                                      },
                                      {
                                      required: true,
                                      message: "Please input your Comment",
                                      },
                                      ]}
                                      >
                                      <TextArea rows={4} maxLength={6} />
                                    </Item>
                                  </div>
                                  <div className="form-group mt-3">
                                  <label>{t("Rate")} {" "} <Rate onChange={setReviewRate} value={reviewRate} /> {reviewRate}/5</label>
                                  </div>
                                </div>
                                </AntForm>                               
                            </Modal>                      
                          </div>

                        </div>
                        <hr
                          style={{ borderTop: "1px solid rgba(0,0,0,.06)" }}
                        />
                        <div className="comment-holder">
                          {reviews.length > 0 ? (
                            <>
                            {reviews.map(
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
                                          <p className="author-name">{name}</p>
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
                                        <Rate disabled value={rate} />
                                      }
                                    />
                                  </>
                                );
                              }
                              )}
                              <div>
                              {total > 3 && (
                                <div className="pagination-holder">
                                  <Pagination
                                    defaultCurrent={1}
                                    total={total}
                                    pageSize="3"
                                    current={page}
                                    onChange={(value) => setPage(value)}
                                  />
                                </div>
                              )} 
                              </div>
                            </>
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
                      {Recommended.length > 0 ? (
                        <>
                          <ProductCard
                            products={Recommended}
                            title="Recommended Products"
                          />
                        </>
                      ) : (
                        <div className="AddressInfo-container">
                          <Heading heading="Recommended Products" />
                          <div className="AddressInfo-item">
                            <Alert key="primary" variant="primary">
                              <Alert.Heading
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                }}
                              >
                                No Recommended Products{" "}
                              </Alert.Heading>
                            </Alert>
                          </div>
                        </div>
                      )}
                    </Row>
                    {loading && 
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                      }}>
                      <LoadingSpinner />
                    </div>
                    }
                    </>
              </>
            );
          })}
      </Container>
    </div>
  );
}

export default ProductInfo;
