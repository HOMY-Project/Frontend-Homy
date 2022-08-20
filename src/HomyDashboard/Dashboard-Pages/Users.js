import React , { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
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
  Divider,
  Space
} from "antd";

import HomyTable from '../components/Common/table';

const Users = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users-employess`, {
          headers: { token: `Bearer ${token}` },
        },{ cancelToken: source.token });
        setData(data);
        console.log(data, 'users');
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

  const onFinish = async (values) => {
    try {
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/roles`
      , { 
        name: name,
        permissionPage: values.permissionPage
      },         
      {
        headers: { token: `Bearer ${token}` },
      });
      message.success(msg);
      setIsModalVisible(false);
    }catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  }

  const content = () => {
    return(
      <Form
      className="formAddRole"
      layout="vertical"
      onFinish={onFinish} 
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
      <Form.Item label="Email" required tooltip="This is a required field"       
      rules={[
          {
            required: true,
            message: 'Missing Email',
          },
        ]}>
        <Input placeholder="Email Name" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Password" required tooltip="This is a required field"       
      rules={[
          {
            required: true,
            message: 'Missing Password',
          },
        ]}>
        <Input placeholder="Role Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
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
              title="Users Table"
              extra={
                <>
                  {user.role === 2 && <HomyModal content={content()} 
                  btnText="Add Role" 
                  ModalTitle="Add New Role" 
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  /> } 
                </>
              }
            >
              <div className="table-responsive">
                <HomyTable
                  columnsNames={['image','name', 'place']}
                  // data={data}
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

export default Users;