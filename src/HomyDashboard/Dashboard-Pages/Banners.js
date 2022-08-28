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
  Button,
  Spin
} from "antd";

import HomyTable from '../components/Common/table';
import HomyModal from '../components/Common/Modal';

const Banners = () => {
  const [name, setName] = useState('');
  const [image, setImg] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdded , setIsAdded] = useState(false);
  const { pathname } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token, user, permission } = useSelector((state) => state.auth);

  const uploadImg = (e) => {
    setLoading(true);
    const { files } = e.target;
    console.log(files[0])
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', "pslraocg")
    axios.post('https://api.cloudinary.com/v1_1/homyecommarce/image/upload', formData)
    .then(({ data }) => {
      setImg(data.secure_url);
    })
    .catch(() => message.error('something got wrong, image can not upload'))
    .finally(() => {
      setLoading(false);
    });
};
  
  // get Banners
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getBanners = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/banners`, {
          headers: { token: `Bearer ${token}`, pathname },
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
    getBanners();
    return () => {
      source.cancel();
    };
  }, [isAdded]);

  const handelEdit = async (id, setIsEditModalVisible) => {
    try {
     await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/banner/${id}`,
        {
          name,
          image
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
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/banner`
      , { 
        name, image
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
      <Form.Item label="Image" required tooltip="This is a required field" 
      rules={[
          {
            required: true,
            message: 'Missing Image Url',
          },
        ]}>
        <Input name="image" placeholder="Image Url" type="file" onChange={uploadImg}/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {loading && <Spin />}
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
              title="Banners Table"
              extra={
                <>
                  {(user.role === 2 || permission.find((item) => item.methodname === 'post'&& item.link === pathname)) && 
                  <HomyModal content={content()} 
                  btnText="Add banner" 
                  ModalTitle="Add New banner" 
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  /> } 
                </>
              }
            >
              <div className="table-responsive">
                <HomyTable
                  columnsNames={['id','image','name']}
                  data={data}
                  pathname={pathname}
                  className="ant-border-space"
                  isEditing={true}
                  content={content}
                  isAction={true}
                  EditTitle="Edit Banner"
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
