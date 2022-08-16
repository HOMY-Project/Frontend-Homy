import { Carousel, message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const Slider = () => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getBanners = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/banaras`,
          { cancelToken: source.token }
        );
        setSlider(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getBanners();
    return () => {
      source.cancel();
    };
  }, []);

    return(
    <Carousel autoplay>
      {slider.length >0 && slider.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.name}  className="contentStyle sliderImg"/>
        </div>
      ))}
    </Carousel>
    )
};

export default Slider;
