import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StarFilled } from '@ant-design/icons';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import Heading from "../Heading/index";
import './index.css';
const { Meta } = Card;

const SuperDeals = () => {
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
      <Heading heading="Super Deals" />
      <Carousel responsive={responsive}>
        <div>
        <Card bordered={false} cover={<img alt="example" src="https://i.postimg.cc/0NfwBLRt/Camera-uta6i-EV-1.png" />}>
          <Meta title={<Link to='/api/v1/product/:productId'>Xiaomi Motion-Activated Night Light</Link>} description="www.instagram.com" />
          <div style={{ display: 'flex' , alignItems: 'center', marginBottom: '2%' }}>
            <StarFilled /> <span style={{ marginLeft: '2%' }}>5.0</span>
          </div>
          <div className="price-holder">
            <p className="price">4.00 KWD</p>
            <p className="discount">4.00 KWD</p>
          </div>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">Add to Cart </Button>
          </div>
        </Card>
        </div>
        <div>
        <Card bordered={false} cover={<img alt="example" src="https://i.postimg.cc/0NfwBLRt/Camera-uta6i-EV-1.png" />}>
          <Meta title="Xiaomi Motion-Activated Night Light" description="www.instagram.com" />
          <div style={{ display: 'flex' , alignItems: 'center', marginBottom: '2%' }}>
            <StarFilled /> <span style={{ marginLeft: '2%' }}>5.0</span>
          </div>
          <div className="price-holder">
            <p className="price">4.00 KWD</p>
            <p className="discount">4.00 KWD</p>
          </div>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">Add to Cart </Button>
          </div>
        </Card>
        </div>
        <div>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
        </div>
        <div>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
        </div>
      </Carousel>
    </div>
  );
};

export default SuperDeals;
