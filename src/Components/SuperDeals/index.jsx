import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductCard from "./ProductCard";
import { message } from 'antd';

const SuperDeals = () => {
  const [superProducts, setSuperProducts] = useState([]);
  // const [topProducts, setTopProducts] = useState([]);


  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProducts = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/super`, { cancelToken: source.token });
        setSuperProducts(data);
        console.log(data);
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

  return (
    <>
      <ProductCard products={superProducts} title="Super Deals" />
      <ProductCard products={superProducts} title="Top Sellers" />
    </>
  )
  
};

export default SuperDeals;
