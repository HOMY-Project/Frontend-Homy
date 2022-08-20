import React , { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Input,
  Space
} from "antd";

import HomyTable from '../components/Common/table';


const Categories = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCategories = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`, { cancelToken: source.token });
        setData(data);
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
  }, []);

  
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Categories Table"
            >
              <div className="table-responsive">
                <HomyTable
                  columnsNames={['image','name', 'place']}
                  data={data}
                  setData= {setData}
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

export default Categories;
