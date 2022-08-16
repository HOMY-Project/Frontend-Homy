import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../Heading/index";
import { message, Radio } from "antd";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import "./index.css";

function ShopByCate() {

  const [category, setCategories] = useState([]);
  const [filterVal, setFilterVal] = useState(null);
  const { t } = useTranslation();

  const filterValChange = (e) => {
      setFilterVal(e.target.value);
    };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCategories = async () => {
      const url = filterVal
        ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/categories?place=${filterVal}`
        : `${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`;
      try {
        const { data: { data } } = await axios.get(url, { cancelToken: source.token });
        setCategories(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getCategories();
    return () => {
      source.cancel();
    };
  }, [filterVal]);

  return (
    <div style={{ padding: "0px 4%" }} className="shopByCate-holder">
      <Heading heading={t("Shop By category")} />
      <Container fluid>
      <Row style={{ marginBottom: "3%" }} >
            <Radio.Group value={filterVal} onChange={filterValChange}>
                  <Radio.Button value={null}>{t('All')}</Radio.Button>
                  <Radio.Button value="out">{t('Outdoor')}</Radio.Button>
                  <Radio.Button value="in">{t('Indoor')}</Radio.Button>
            </Radio.Group>
      </Row>
        <Row>
          {category.map((item, index) => {
            return (
              <Col key={index} style={{ display: 'flex', flexDirection: 'column' , alignItems: 'center' }}>
                {" "}
                  <Link to={`/api/products/${item.id}`}>
                <div className="categoryImg-holder">
                  {" "}
                  <img
                    src={item.image}
                    alt="homey-sg-home-security-camera-1"
                    width="100%"
                    className="categoryImg"
                  />
                </div>{" "}
                </Link>
                <p className="categoryName" style={{ marginTop: "5%", fontWeight: "bold" , fontSize: "16px" }}>{item.name}</p>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default ShopByCate;
