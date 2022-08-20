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
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import HomyTable from '../components/Common/table';
import HomyModal from '../components/Common/Modal';
import './style.css';

const Roles = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [pages, setPages ] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getRoles = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/roles`, {
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
    getRoles();
    return () => {
      source.cancel();
    };
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getPages = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/pages`, {
          headers: { token: `Bearer ${token}` },
        },{ cancelToken: source.token });
        setPages(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getPages();
    return () => {
      source.cancel();
    };
  });
  
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
      name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off"
    >
      <Form.Item label="Role" required tooltip="This is a required field"       
      rules={[
          {
            required: true,
            message: 'Missing Name',
          },
        ]}>
        <Input placeholder="Role Name" value={name} onChange={(e)=> setName(e.target.value)}/>
      </Form.Item>
      <Divider />
      <Form.List name="permissionPage">  
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  label="Permissions"
                  {...restField}
                  name={[name, 'permissionId']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing permission Id',
                    },
                  ]}
                >
                <Select
                  placeholder="Select Permission"
                >
                  <Option value={1} label="Get" key="1">
                    Get
                </Option>
                <Option value={2} label="Post" key="2">
                    Post
                </Option>
                <Option value={3} label="Put" key="3">
                    Put
                </Option>
                <Option value={4} label="Delete" key="4">
                    Delete
                </Option>
                </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Pages"
                  name={[name, 'pageId']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing page Id',
                    },
                  ]}
                >
                <Select
                  placeholder="Select Page"
                >
              {pages.map((page) => {
                if(page.name !== 'roles' && page.name !== 'profile' && page.name !== 'users'){
                  return(
                    <Option value={page.id} label={page.name}>
                      <div className="demo-option-label-item">
                        {page.name}
                      </div>
                    </Option>
                  )
                }
              })}
                </Select>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
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
              title="Roles Table"
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
                  columnsNames={['image','id','role']}
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

export default Roles;
