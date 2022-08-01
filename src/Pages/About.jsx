import React from "react";
import { Col, Row } from 'antd';
import WelcomeToHomy from "../Components/WelcomeToHomy";
import FeaturedCard from "../Components/Features";
import track from '../assets/track.png';
import hr from '../assets/24hr.png';
import giftFeature from '../assets/giftFeature.png';  
import '../Components/Header/media.css';

function AboutUs() {
  return (
    <div className="aboutus-holder">
      <WelcomeToHomy />
      <div className="site-card-wrapper" style={{ marginTop: "4%" , padding:" 0 10%" }}>
        <Row gutter={16}>
          <Col span={8}>
            <FeaturedCard featuredImg={track} featuredTitle = "Fast Delivery" />
          </Col>
          <Col span={8}>
            <FeaturedCard featuredImg={hr} featuredTitle = "Available 24 Hours"/>
          </Col>
          <Col span={8}>
             <FeaturedCard featuredImg={giftFeature} featuredTitle = "Quality Products"/>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AboutUs;
