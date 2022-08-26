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


const Categories = () => {
  const [name, setName] = useState('');
  const [image, setImg] = useState('');
  const [place, setPlace] = useState('');
  const [data, setData] = useState([]);
  const [hasSubCategories , setHasSubCategories] = useState(false);
  const [isAdded, setIsAdded ] = useState(false);
  const [isArchived, setIsArchived ] = useState(false); // to update data after archive action
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const { Option } = Select;

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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCategories = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/categories`,
        {
          headers: { token: `Bearer ${token}`, pathname },
        }, 
        { cancelToken: source.token });
        setData(data);
        console.log(data, 'category');
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
  }, [isAdded, isArchived]);

  const handelEdit = async (id, setIsEditModalVisible) => {
    try {
     await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/category/${id}`,
        {
          name, image, place, hasSubCategories
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
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/category/${id}`,
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
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/category/${id}/archive?archive=${!archived}`,{ }, { headers: { token: `Bearer ${token}`, pathname } });
      setIsArchived(true)
      message.success("Product Archived successfully");
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
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/category`
      , { 
        name, image, place, hasSubCategories
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
      <Form.Item label="Image" required tooltip="This is a required field" 
      rules={[
          {
            required: true,
            message: 'Missing Image Url',
          },
        ]}>
        <Input name="image" placeholder="Image Url" type="file" onChange={uploadImg}/>
      </Form.Item>
      <Form.Item label="In Stock" required tooltip="This is a required field" >
        <Select onChange={(value)=> setPlace(value)}>
          <Option value="in" label="In" key="in">
            <div className="demo-option-label-item">
              Indoor
            </div>
          </Option>
          <Option value="out" label="Out" key="out">
            <div className="demo-option-label-item">
              Outdoor
            </div>
          </Option>
        </Select>
      </Form.Item>
      <Form.Item label="Has Sub Category" required tooltip="This is a required field" >
        <Select onChange={(value)=> setHasSubCategories(value)}>
          <Option value={true} label="Has" key={true}>
            <div className="demo-option-label-item">
              has
            </div>
          </Option>
          <Option value={false} label="hasn'nt" key={false}>
            <div className="demo-option-label-item">
              has'nt 
            </div>
          </Option>
        </Select>
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
              title="Categories Table"
              extra={
                <>
                  {user.role === 2 && <HomyModal content={content()} 
                  btnText="Add Category" 
                  ModalTitle="Add New Category" 
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  /> } 
                </>
              }
            >
              <div className="table-responsive">
                <HomyTable
                  columnsNames={['image','name', 'place', 'has_sub_categories']}
                  data={data}
                  setData= {setData}
                  className="ant-border-space"
                  isDelete={true}
                  isEditing={true}
                  isAction={true}
                  isArchive={true}
                  content={content}
                  handelArchive={handelArchive}
                  handleDelete={handleDelete}
                  EditTitle="Edit Category"
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
