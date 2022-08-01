import { Carousel } from "antd";
import React from "react";
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpeg";
import "./index.css";

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
};
// autoplay
const Slider = () => (
  <Carousel autoplay>
    <div>
      <img
        src={slider1}
        alt="slider1"
        style={contentStyle}
        className="sliderImg"
      />
    </div>
    <div>
      <img
        src={slider2}
        alt="slider2"
        style={contentStyle}
        className="sliderImg"
      />
    </div>
    <div>
      <img
        src={slider1}
        alt="slider1"
        style={contentStyle}
        className="sliderImg"
      />
    </div>
  </Carousel>
);

export default Slider;
