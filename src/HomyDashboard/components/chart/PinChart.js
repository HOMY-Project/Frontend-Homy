import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import pinChart from "./configs/pinChart";

function PinChart() {
  const { Title, Paragraph } = Typography;
  const [data, setData ] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getStatistics = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/order-status`,  {
          headers: { token: `Bearer ${token}` },
        },{ cancelToken: source.token });
    //    const newData= data.map(item => item.total)
        setData(data);
        console.log(data, 'statistics');
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        alert(msg);
      }
    };
    getStatistics();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Order Status</Title>
          <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Pending</li>
            <li>{<MinusOutlined />} Complete</li>
            <li>{<MinusOutlined />} Reject </li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        // className="full-width"
        options={pinChart.options}
        series={data.map(item => item.total)}
        type="pie"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default PinChart;
