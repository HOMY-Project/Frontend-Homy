import React , { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  message,
} from "antd";

import HomyTable from '../components/Common/table';

const Banners = () => {
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/banners`, {
          headers: { token: `Bearer ${token}` },
        },{ cancelToken: source.token });
        setData(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getUsers();
    return () => {
      source.cancel();
    };
  }, []);


  
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Users Table"
            >
              <div className="table-responsive">
                <HomyTable
                  columnsNames={['image','name', 'place']}
                  data={data}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Banners;
