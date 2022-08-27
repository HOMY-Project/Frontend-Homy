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
} from "antd";
import HomyTable from '../components/Common/table';
import HomyModal from '../components/Common/Modal';


const SubCategories = () => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([])
  const [isAdded, setIsAdded ] = useState(false);
  const [isArchived, setIsArchived ] = useState(false); // to update data after archive action
  const { pathname } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token, user, permission } = useSelector((state) => state.auth);
  const { Option } = Select;


  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCategory = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/categories`,
        {
          headers: { token: `Bearer ${token}`, pathname },
        }, 
        { cancelToken: source.token });
        setCategories(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getCategory();
    return () => {
      source.cancel();
    };
  }, [isAdded, isArchived]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getSubCategories = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/sub-categories`,
        {
          headers: { token: `Bearer ${token}`, pathname },
        }, 
        { cancelToken: source.token });
        setData(data);
        console.log(data, 'sub');
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getSubCategories();
    return () => {
      source.cancel();
    };
  }, [isAdded, isArchived]);

  const handelEdit = async (id, setIsEditModalVisible) => {
    try {
     await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/sub-category/${id}`,
        {
          name,
          categoryId
        },
        {
          headers: { token: `Bearer ${token}`, pathname },
        }
      );
      setIsAdded(true)
      setIsEditModalVisible(false)
      message.success('edit successfully');
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };

  const handleDelete = async (id) =>{
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/sub-category/${id}`,
        { headers: { token: `Bearer ${token}`, pathname } }
      );
      setData((prev) => prev.filter((item) => item.id !== id));
      setIsArchived(true)
      message.success("Product deleted successfully");
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  }

  const handelArchive = async (id, archived ) =>{
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/sub-category/${id}/archive?archive=${!archived}`,{ }, { headers: { token: `Bearer ${token}`, pathname } });
      message.success("Product Archived successfully");
      setIsArchived(true)
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  }

  const onFinish = async () => {
    try {
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/sub-category`
      , { 
        name, categoryId
      },         
      {
        headers: { token: `Bearer ${token}`, pathname },
      });
      setIsAdded(true)
      setIsModalVisible(false);
      message.success(msg);
    }catch ({ response: { data: { message: msg } } }) {
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
      <Form.Item label="Category" required tooltip="This is a required field" >
        <Select
            onChange={(value)=> setCategoryId(value)}
            >
          {categories && categories.map((item) => {
              return(
                <Option value={item.id} label={item.name} key={item.id}>
                  <div className="demo-option-label-item">
                    {item.name}
                  </div>
                </Option>
              )
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
              title="Categories Table"
              extra={
                <>
                  {(user.role === 2 || permission.find((item) => item.methodname === 'post'&& item.link === pathname))&& <HomyModal content={content()} 
                  btnText="Add Sub Category" 
                  ModalTitle="Add New Sub Category" 
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  /> } 
                </>
              }
            >
              <div className="table-responsive">
             <HomyTable
                  columnsNames={['categoryname', 'category_id', 'createdat']}
                  data={data}
                  setData= {setData}
                  className="ant-border-space"
                  handelArchive={handelArchive}
                  handleDelete={handleDelete}
                  isDelete={true}
                  isEditing={true}
                  isAction={true}
                  isArchive={true}        
                  content={content} 
                  EditTitle="Edit Sub Category"
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

export default SubCategories;
