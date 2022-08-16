import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Radio, Slider, Checkbox, Result } from "antd";
import { useTranslation } from "react-i18next";
import { StarFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { addProduct } from '../../Redux/features/cartSlice';
import '../SuperDeals/index.css';
import "./index.css";
import Heading from "../Heading";
import { Breadcrumb } from "antd";

const Category = () => {
  const [Products, setProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [place, setPlace] = useState(null);
  const [categoryName, setCategoryName ] = useState([]);
  const [sortVal, setSortVal] = useState(null);
  const [page, setPage] = useState(1);
  const [minPrice, setMin] = useState(0);
  const [maxPrice, setMax] = useState(0);
  const [subCate, setSubCate] = useState([]);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [subCategory, setsubCategory] = useState("0");
  const itemId = window.location.href.split("/")[5];
  const { t } = useTranslation();
    const { Meta } = Card;

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
    ///api/v1/categories/:categoryId
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProducts = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/products?categoryId=${itemId}&&place=${place}&&page=${page}`;
      console.log(url, "url");
      try {
        const {
          data: { products },
        } = await axios.post(
          url,
          {
            filter: {
              minPrice,
              maxPrice,
              subCategory,
              brands,
            },
          },
          { cancelToken: source.token }
        );
        setProducts(products);
        console.log(products, "products");
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
  }, [place, page, subCategory, minPrice, maxPrice, brands]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getSubCate = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`;
      try {
        const {
          data: { data },
        } = await axios.get(url, { cancelToken: source.token });
        setSubCate(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {}
    };
    getSubCate();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getBrands = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/brands`,
          { cancelToken: source.token }
        );
        setAllBrands(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getBrands();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCategoryName = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/categories/${itemId}`,
          { cancelToken: source.token }
        );
        setCategoryName(data);
        console.log(data, "data");
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
  }, []);

  return (
    <Container fluid style={{ marginTop: "3%" }} className="category-holder">
      <Breadcrumb style={{ marginBottom: "4%" }}>
        <Breadcrumb.Item>
          <a href="/">{t("Home")}</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/"> {categoryName[0]?.name}</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col lg={3} ms={12}>
          <div className="shopyNow-holder">
            <h4 className="shopBy">{t("Shop by")}</h4>
          </div>
          <div className="filter-holder">
            <div className="filter by-category">
              <h5 className="filter-title"> {t("Filter By")} </h5>
              <Radio.Group
                onChange={(e) => setPlace(e.target.value)}
                value={place}
              >
                <Radio value={null}>All</Radio>
                <Radio value="in">Indoor</Radio>
                <Radio value="out">Outdoor</Radio>
              </Radio.Group>
            </div>
            <div className="filter by-category">
              <h5 className="filter-title" style={{ marginBottom: "4%" }}>
                {" "}
                {t("Price Range")}{" "}
              </h5>
              <Slider range  min={0} max={1000} onChange={(value) => (setMin(value[0]), setMax(value[1]))} 
                />
            </div>
            <div className="filter by-category">
              <h5 className="filter-title"> {categoryName[0]?.name} </h5>
              <Radio.Group
                onChange={(e) => setsubCategory(e.target.value)}
                value={subCategory}
              >
                <Radio value={'0'}>All Locks</Radio>
                {subCate.length > 0 &&
                  subCate.map((item, index) => {
                    return (
                      <Radio value={item.id.toString()}>{item.name}</Radio>
                    );
                  })}
              </Radio.Group>
            </div>
            <div className="filter by-brands">
              <h5 className="filter-title"> {t("Brands")} </h5>
              <Checkbox.Group
                onChange={(checkedValues) => setBrands(checkedValues)}
                value={brands}
              >
                {allBrands.length > 0 &&
                  allBrands.map((item, index) => {
                    return <Checkbox value={item.name}>{item.name}</Checkbox>;
                  })}
              </Checkbox.Group>
            </div>
          </div>
        </Col>
        <Col lg={9} ms={12}>
          <Heading heading={t("Results for - ") + categoryName[0]?.name} />
          {/* <div className="sort-holder">
                    <div className="sort-by">
                        <h5 className="filter-title"> Sort By </h5>
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={(value) => setSortVal(value)}>
                            <Option value="jack">Price: Low to High</Option>
                            <Option value="lucy">Price: High to Low</Option>
                        </Select>
                    </div>
                </div> */}
          <div className="product-holder">
            <Row>
              {Products.length > 0 ? Products.map((product) => (
                <Col lg={4} md={6} sm={12} xs={12} style={{marginBottom: '4%'}}>
                    <div key={product.id}>
                    <Card
                        bordered={false}
                        cover={<img alt="example" src={product.image} />}
                    >
                        <Meta
                        title={
                            <Link to={`/api/v1/product/${product.id}`}>
                            {" "}
                            {product.name}{" "}
                            </Link>
                        }
                        description={product.quick_overview}
                        />
                        <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "2%",
                            marginTop: "3%",
                        }}
                        >
                        <StarFilled />{" "}
                        <span style={{ marginLeft: "2%" }}>5.0</span>
                        </div>
                        <div className="price-holder">
                        <p className="price">{product.price} KWD</p>
                        <p className="discount">{product.discount} KWD</p>
                        </div>
                        <div className="d-grid gap-2">
                        <Button
                            variant="primary"
                            size="lg"
                            className="btn btn-cart"
                            onClick={() => handelAddProduct(product)}
                        >
                            Add to Cart{" "}
                        </Button>
                        </div>
                    </Card>
                    </div>
                </Col>
              )): 
                <div className="no-product"> <Result title={t("There are no products in this category")}/> </div>}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
