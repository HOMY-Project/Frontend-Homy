import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllProducts } from '../../Redux/features/authSlice';
import axios from "axios";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";
import { message } from 'antd';

const SuperDeals = () => {
  const [superProducts, setSuperProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const { searchWord } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {t } = useTranslation();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProducts = async () => {
      const url = searchWord !== undefined 
      ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/search?productName=${searchWord}`
      : `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/super`;
      try {
        const { data: { data } } = await axios.get(url, { cancelToken: source.token });
        dispatch(setAllProducts(data));
        setSuperProducts(data);
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
  }, [searchWord]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getTopProducts = async () => {
      const url = searchWord !== undefined 
      ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/search?productName=${searchWord}`
      : `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/top-seller`;
      try {
        const { data: { data } } = await axios.get(url, { cancelToken: source.token });
        dispatch(setAllProducts(data));
        setTopProducts(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getTopProducts();
    return () => {
      source.cancel();
    };
  }, [searchWord]);

  return (
    <>
      <ProductCard products={superProducts} title={t("Super Deals")} />
      <ProductCard products={topProducts} title={t("Top Sellers")} />
    </>
  )
  
};

export default SuperDeals;
