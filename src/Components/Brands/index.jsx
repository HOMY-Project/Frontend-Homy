import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { message } from "antd";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Heading from "../Heading";
import './index.css';

const Brands = () => {
    const [brands, setBrands ] = useState([]);

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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getAddress = async () => {
      try {
        const { data: { data } } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/brands`,
          { cancelToken: source.token }
        );
        setBrands(data);
        console.log(brands, 'brand');
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getAddress();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="brands-holder">
    <Container fluid>
    <Heading heading="Brands Currently Trending" />
        <Row>
        <Carousel responsive={responsive}>
            {brands.length > 0 && brands.map((brand) => (
                <div key={brand.name} style={{ width: '100px'}}>
                    <img src={brand.image} alt={brand.name} style={{ width: '100%'}}/>
                </div>
            ))}
      </Carousel>
        </Row>
    </Container>
    </div>
  );
};

export default Brands;
