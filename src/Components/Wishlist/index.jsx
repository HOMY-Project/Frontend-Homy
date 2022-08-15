import React, { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  Container,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Button, message, Popconfirm, Result, Breadcrumb } from "antd";
import Heading from "../Heading";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { removeItemFromWishlist, addProduct } from '../../Redux/features/cartSlice';
import axios from "axios";
import "../Order/index.css";
import "./index.css";
import empty from '../../assets/wishlistnotfound.jpg';

const Wishlist = () => {
  const cart = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
      const source = axios.CancelToken.source();
      if(token){
      const getCartProducts = async () => {
          try {
           const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${user.id}/wishlist`,
              {
              headers: { token: `Bearer ${token}` },
              }, 
              {
              cancelToken: source.token,
          });
          console.log(data, 'wishlist prod');
          } catch ({
          response: {
              data: { message: msg },
          },
          }) {
          message.warning(msg);
          }
      };
      getCartProducts();
  }
  return () => {
      source.cancel();
  };
  }, [])
  const handelAddProduct = async (product) => {
    if (token && product) {
      const carts = [{ ...product, quantity:1 }];
      try {
        const {
          data: { message: msg },
        } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/cart`,
          { carts },
          { headers: { token: `Bearer ${token}` } }
        );
        dispatch(addProduct({ ...product, quantity:1 }));
        message.success(msg);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    } else {
      return  dispatch(addProduct({ ...product, quantity: 1 }))
    }
  };

  const handelDeleteProductWishlist = async (productId) =>{
    if (token) {
      try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/wishlist/${productId}`
        , { headers: { token: `Bearer ${token}` } });
        dispatch(removeItemFromWishlist(productId));
        message.success('product deleted successfully From Wishlist');
      } catch ({ response: {data: { message: msg }} }) {
        message.error(msg);
      }
    }else{
      dispatch(removeItemFromWishlist(productId));
    }
    }   
  return (
    <div>
      {cart.wishlist.length > 0 ? ( 
      <Container fluid style={{ marginTop: "3%" }} className="order-holder">
        <Breadcrumb style={{ marginBottom: "4%"}}>
            <Breadcrumb.Item>
              <a href="/">{t('Home')}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{t('Wishlist')}</a>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Heading heading={cart.wishlist.length +" "+ t("Items in your Wishlist")} />
        <Row>
          <Col lg="9" md="10" sm="12">
            <div className="wishlistContainer">
              {cart.wishlist?.map((prod) => (
                <ListGroup.Item key={prod.id}>
                  <Row style={{ alignItems: "center" }}>
                    <Col md={3}>
                      <Image src={prod.image} alt={prod.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <span>{prod.name}</span>
                    </Col>
                    <Col md={2}>
                        <span style={{ fontWeight: "bold" , fontSize: "15px" }}> {prod.price} KWD</span>
                    </Col>
                    <Col md={1}>
                      <button onClick={() => handelAddProduct(prod) } className="btn btn-cartIcon">
                          <box-icon name="cart" ></box-icon>
                      </button>
                    </Col>
                    <Col md={1}>
                    <Popconfirm
                          title="Are you sure to delete this task?"
                          onConfirm={() => {
                            handelDeleteProductWishlist(prod.id)
                          }}
                          onCancel={(e) => {
                            console.log(e);
                            message.error('something went wrong');
                          }}
                          okText="Yes"
                          cancelText="No"
                          >
                       <button
                            className="btn btn-cancelIcon"
                        >
                            <CloseOutlined />
                        </button>
                          </Popconfirm>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      ) : (
        <Result
        icon={<img src={empty} alt="empty-cart" style={{ width: '250px' }}/>}
        title="Your Wishlist is empty!"
        extra={ <Link to="/"> <Button type="primary">{t("Shop Now")}</Button> </Link>}
      />
      )}
    </div>
  );
};

export default Wishlist;
