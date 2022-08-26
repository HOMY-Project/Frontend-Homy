import React , { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  message, 
  Form,
  Input,
  Select,
  Button,
} from "antd";

import HomyTable from '../components/Common/table';
import HomyModal from '../components/Common/Modal';
import ExportBtn from '../components/Common/ExportBtn';

const Users = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roles, setRole] = useState('');
  const [data, setData] = useState([]);
  const [roleName, setRoleName ] = useState('');
  const [isAdded , setIsAdded] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;
  const { pathname } = useLocation();

  //get user
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getUsers = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users-employees`, {
          headers: { token: `Bearer ${token}`,pathname },
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
  }, [isAdded]);

    // get Roles
    useEffect(() => {
      const source = axios.CancelToken.source();
      const getRoles = async () => {
        try {
          const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/roles`, {
            headers: { token: `Bearer ${token}`,pathname },
          },{ cancelToken: source.token });
          console.log(data, 'roles');
          setRole(data);
        } catch ({
          response: {
            data: { message: msg },
          },
        }) {
          message.warning(msg);
        }
      };
      getRoles();
      return () => {
        source.cancel();
      };
    },[]);
    
  const onFinish = async () => {
    try {
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/employee`
      , { 
        name, email, password, roleId:roleName , phone
      },         
      {
        headers: { token: `Bearer ${token}`, pathname },
      });
      message.success(msg);
      setIsAdded(true)
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
      <Form.Item label="Phone" required tooltip="This is a required field"       
      rules={[
          {
            required: true,
            message: 'Missing Phone Number',
          },
        ]}>
        <Input placeholder="Phone Number" type="text" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
      </Form.Item>
      <Form.Item
              label="ٌRole"
              name='role'
              rules={[
                {
                  required: true,
                  message: 'Missing role name',
                },
              ]}
              >
            <Select
              onChange={(value)=> setRoleName(value)}
              placeholder="Select Role Name"
            >
          {roles && roles.map((item) => {
            if(item.role !== 'admin'){
              return(
                <Option value={item.id} label={item.role} key={item.id}>
                  <div className="demo-option-label-item">
                    {item.role}
                  </div>
                </Option>
              )
            }
          })}
        </Select>
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
                  btnText="Add User" 
                  ModalTitle="Add New User" 
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  /> } 
                  <ExportBtn data={data}/>
                </>
              }
            >
              <div className="table-responsive">
                <HomyTable
                  columnsNames={['userid','name', 'email', 'phone', 'role']}
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

export default Users;
