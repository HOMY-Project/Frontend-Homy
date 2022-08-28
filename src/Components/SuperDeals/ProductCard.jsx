import React, { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StarFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Card, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import Heading from "../Heading/index";
import axios from "axios";
import './index.css';
import { addProduct } from '../../Redux/features/cartSlice';
const { Meta } = Card;



function ProductCard({ products, title }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const handelAddProduct = async (product) => {
    if (token &&  product) {
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
    return dispatch(addProduct({ ...product, quantity:1 }))
    }
  };
  const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
      return (
        <div style={{ padding: "0px 4%" }} className="superDeals">
          <Heading heading={title} />
          <Carousel responsive={responsive}>
            {products.map((product) => (
            <div key={product.id}>
                <Card bordered={false} cover={<img alt="example" src={product.image} />}>
                <Meta 
                title={<Link to={`/api/v1/product/${product.id}`}> {product.name} </Link>} 
                description={product.quick_overview} 
                />
                <div style={{ display: 'flex' , alignItems: 'center', marginBottom: '2%', marginTop: '3%' }}>
                    <StarFilled /> <span style={{ marginLeft: '2%' }}>{product.rating === 0 && product.users_rated_number === 0 ? "0" : (product.rating / product.users_rated_number)}</span>
                </div>
                <div className="price-holder">
                    <p className="price">{(product.price - product.discount) >= 0 ? (product.price - product.discount) : 0} KWD</p>
                    <p className="discount">{product.price} KWD</p>
                </div>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" className="btn btn-cart"onClick={() => handelAddProduct(product)}>Add to Cart </Button>
                </div>
                </Card>
            </div>
            ))}
          </Carousel>
        </div>
      );
}

export default ProductCard;