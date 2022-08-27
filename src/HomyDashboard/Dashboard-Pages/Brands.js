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


const Categories = () => {
  const [name, setName] = useState('');
  const [image, setImg] = useState('');
  const [data, setData] = useState([]);
  const [copyRecord, setCopyRecord] = useState([])
  const [loading, setLoading] = useState(false);
  const [isAdded , setIsAdded] = useState(false);
  const { pathname } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token, user, permission } = useSelector((state) => state.auth);

  useEffect(() =>{
    setName(copyRecord?.name)
    setImg(copyRecord?.img)
  });

  const uploadImg = (e) => {
    setLoading(true);
    const { files } = e.target;
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getBrands = async () => {
        try {
          const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/brands`,
          {
            headers: { token: `Bearer ${token}`, pathname },
          }, 
          { cancelToken: source.token });
          setData(data);
          console.log(data, 'brand');
        } catch ({
          response: {
            data: { message: msg },
          },
        }) {
          message.warning(msg);
        }
    };
    getBrands();
    return () => {
      source.cancel();
    };
  }, [isAdded]);

  const handelEdit = async (id, setIsEditModalVisible) => {
    try {
     await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/brand/${id}`,
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
    try {
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/brand`
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
    if(record) {
      setCopyRecord(record)
      // setImg(record.image)
    }
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
              title="Brands Table"
              extra={
                <>
                  {(user.role === 2 || permission.find((item) => item.methodname === 'post'&& item.link === pathname)) && <HomyModal content={content()} 
                  btnText="Add Brand" 
                  ModalTitle="Add New Brand" 
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  /> } 
                </>
              }
            >
              <div className="table-responsive">
               <HomyTable
                  columnsNames={['image','name']}
                  data={data}
                  setData= {setData}
                  className="ant-border-space"
                  isAction={true}
                  isEditing={true}
                  content={content}
                  EditTitle="Edit Brand"
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

export default Categories;
