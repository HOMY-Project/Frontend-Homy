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
  const [TopProArr , setTopProArr] = useState([]);
  const { searchWord } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {t } = useTranslation();

  const getTopSellerPro = async () => {
    try{
      if(topProducts){
        for (const key in topProducts) {
          const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${topProducts[key]}`);
          setTopProArr((prev) => [...prev, data[0]]);
        }
      }
    }catch(err){
      message.error(err.message);
    }
  }
  
  // get super pro
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProducts = async () => {
      const url = searchWord !== undefined 
      ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/search?productName=${searchWord}`
      : `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/super`;
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/super`, { cancelToken: source.token });
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

  // get top seller pro
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getTopProducts = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/top-seller`, { cancelToken: source.token });
        dispatch(setAllProducts(data));
        setTopProducts(data);
        // getTopSellerPro();
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
  },[]);

  return (
    <>
      <ProductCard products={superProducts} title={t("Super Deals")} />
      <ProductCard products={topProducts} title={t("Top Sellers")} />
    </>
  )
  
};

export default SuperDeals;
