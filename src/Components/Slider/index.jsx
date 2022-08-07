import { Carousel } from "antd";
import React from "react";
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpeg";
import "./index.css";

const Slider = () => (
  <Carousel autoplay>
    <div>
      <img
        src={slider1}
        alt="slider1"
        className="contentStyle sliderImg"
      />
    </div>
    <div>
      <img
        src={slider2}
        alt="slider2"
        className="sliderImg contentStyle"
      />
    </div>
    <div>
      <img
        src={slider1}
        alt="slider1"
        className="contentStyle sliderImg"
      />
    </div>
  </Carousel>
);

export default Slider;
