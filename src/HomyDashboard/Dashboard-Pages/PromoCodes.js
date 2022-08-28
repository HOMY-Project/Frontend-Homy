import React , { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  message, 
  Form,
  Input,
  Select,
  Button,
  Spin
} from "antd";

import HomyTable from '../components/Common/table';
import HomyModal from '../components/Common/Modal';


const PromoCodes = () => {
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [data, setData] = useState([]);
  const [isArchived, setIsArchived ] = useState(false); // to update data after archive action
  const [isAdded , setIsAdded] = useState(false);
  const { pathname } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token, user, permission } = useSelector((state) => state.auth);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getPromoCode = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/promo-codes`,
        {
          headers: { token: `Bearer ${token}`, pathname },
        }, 
        { cancelToken: source.token });
        setData(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getPromoCode();
    return () => {
      source.cancel();
    };
  }, [isAdded, isArchived]);

  const handelEdit = async (id, setIsEditModalVisible) => {
    try {
     await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/promo-code/${id}`,
        {
          name, discount
        },
        {
          headers: { token: `Bearer ${token}`, pathname },
        }
      );
      setIsAdded(true)
      setIsEditModalVisible(false)
      message.success('Update successfully');
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };

  const onFinish = async () => {
    try {
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/promo-code`
      , { 
        name, discount
      },         
      {
        headers: { token: `Bearer ${token}`, pathname },
      });
      message.success(msg);
      setIsModalVisible(false);
      setIsAdded(true)
    }catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  }

  const handleDelete = async (id) =>{
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/promo-code/${id}`,
        { headers: { token: `Bearer ${token}`, pathname } }
      );
      setData((prev) => prev.filter((item) => item.id !== id));
      setIsArchived(true)
      message.success("Promo deleted successfully");
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  }


  const content = (record, setIsEditModalVisible) => {
    return(
      <Form
      className="formAddRole"
      layout="vertical"
      onFinish={record ? () => handelEdit(record.id, setIsEditModalVisible): onFinish} 
      autoComplete="off"
    >
      <Form.Item label="Name" required tooltip="This is a required field"       
        rules={[
            {
              required: true,
              message: 'Missing Name',
            },
          ]}>
        <Input placeholder="Full Name" value={name} onChange={(e)=> setName(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Discount" required tooltip="This is a required field"       
        rules={[
            {
              required: true,
              message: 'Missing discount',
            },
          ]}>
        <Input placeholder="Discount" value={discount} onChange={(e)=> setDiscount(e.target.value)}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    )
  }
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Brands Table"
              extra={
                <>
                  {(user.role === 2 || permission.find((item) => item.methodname === 'post'&& item.link === pathname)) && <HomyModal content={content()} 
                  btnText="Add Promo Code" 
                  ModalTitle="Add New Promo Code" 
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  /> } 
                </>
              }
            >
              <div className="table-responsive">
            <HomyTable
                  columnsNames={['name','discount']}
                  data={data}
                  setData= {setData}
                  className="ant-border-space"
                  isEditing={true}
                  isDelete={true}
                  isAction={true}
                  content={content}
                  EditTitle="Edit Promo Code"
                  handleDelete={handleDelete}
                  pathname={pathname}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PromoCodes;
