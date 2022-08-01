import { Card } from 'antd';
import React from 'react';
import './index.css';

const { Meta } = Card;

const FeaturedCard = ({ featuredImg, featuredTitle }) => (
  <Card
  className="featured-card"
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src={featuredImg} className="featuredImg"/>}
  >
    <Meta title={featuredTitle} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida." />
  </Card>
);

export default FeaturedCard;