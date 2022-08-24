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
  Upload,
  Button,
} from "antd";
import { ToTopOutlined, UploadOutlined } from '@ant-design/icons';
import { Image } from 'cloudinary-react';
import HomyTable from '../components/Common/table';
import HomyModal from '../components/Common/Modal';

const Banners = () => {
  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e?.fileList;
  };

  // const [copyRecord, setCopyRecord] = useState({})
  const [name, setName] = useState('');
  const [image, setImg] = useState('');
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token, user } = useSelector((state) => state.auth);

  const uploadImg = (e) => {
    const { files } = e.target;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', "qekxjhab")
    axios.post('https://api.cloudinary.com/v1_1/homy/image/upload', formData)
    .then(({ data }) => {
      setImg(data.secure_url);
    })
    .catch(() => message.error('something got wrong, image can not upload'));
};
  
  // get Banners
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getBanners = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/banners`, {
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
    getBanners();
    return () => {
      source.cancel();
    };
  }, []);

  const handelEdit = async (id) => {
    console.log(id, 'edit')
    try {
     await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/banner/${id}`,
        {
          name,
          image
        },
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      message.success('edit successfully');
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };

  const onFinish = async () => {
    console.log(image, 'imag')
    try {
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/banner`
      , { 
        name, image
      },         
      {
        headers: { token: `Bearer ${token}` },
      });
      console.log(msg);
      message.success(msg);
      setIsModalVisible(false);
    }catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  }

  const content = (record) => {
    return(
      <Form
      className="formAddRole"
      layout="vertical"
      onFinish={record ? () => handelEdit(record.id): onFinish} 
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
                  {user.role === 2 && <HomyModal content={content()} 
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
                  className="ant-border-space"
                  isEditing={true}
                  content={content}
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
        {/* <div className="uploadfile pb-15 shadow-none">
        <Upload name="logo" action="/upload.do" listType="picture" value={image} onChange={(e)=> setImg(e.target.files)}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </div> */}