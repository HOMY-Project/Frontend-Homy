/* eslint-disable react-hooks/exhaustive-deps */
import React , { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
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
  Upload,
  Spin
} from "antd";

import HomyTable from '../components/Common/table';
import HomyModal from '../components/Common/Modal';
import ExportBtn from '../components/Common/ExportBtn';

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [albums, setAlbums] = useState('');
  const [image, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [quickOverview, setQuickOverview ] = useState('');
  const [discount, setDiscount ] = useState(0);
  const [shipment, setShipment ] = useState(0);
  const [brand, setBrand ] = useState('');
  const [inStock, setInStock ] = useState(false);
  const [subCategoryId, setSubCategoryId ] = useState(0);
  const [categoryId, setCategoryId ] = useState(null);
  const [brandsList, setBrandsList] = useState([]);
  const [cateList, setCateList ] = useState([]);
  const [subCateList, setSubCateList ] = useState([]);
  const [isAdded, setIsAdded ] = useState(false);
  const [isArchived, setIsArchived ] = useState(false); // to update data after archive action
  const [data, setData] = useState([]);
  const { token, user, permission } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;
  const { pathname } = useLocation();

    //Images Upload
  const props = {
    listType: 'picture',
  
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result;
          console.log(reader.result, 'reader.result');

          const formData = new FormData();
          formData.append('file', reader.result);
          formData.append('upload_preset', "pslraocg")
          axios.post('https://api.cloudinary.com/v1_1/homyecommarce/image/upload', formData)
          .then(({ data }) => {
            setAlbums(prev => [...prev, data.secure_url]);
            console.log(albums, 'albmus');
          }) 
          .catch(() => message.error('something got wrong, image can not upload'));

          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.font = '33px Arial';
            ctx.fillText('Ant Design', 20, 20);
            canvas.toBlob((result) => resolve(result));
          };
        };
      });
    },
  };

  const uploadImg = (e) => {
    const { files } = e.target;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', "pslraocg")
    axios.post('https://api.cloudinary.com/v1_1/homyecommarce/image/upload', formData)
    .then(({ data }) => {
      setImg(data.secure_url);
    })
    .catch(() => message.error('something got wrong, image can not upload'));
  };

  const handleDelete = async (id) =>{
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/product/${id}`,
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
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/product/${id}/archive?archive=${!archived}`,{ }, { headers: { token: `Bearer ${token}`, pathname } });
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

  // get Products
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProducts = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/products`, {
          headers: { token: `Bearer ${token}`, pathname },
        },{ cancelToken: source.token });
        console.log(data, 'products');
        setData(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getProducts();
    return () => {
      source.cancel();
    };
  }, [isAdded, isArchived]);

  // get brands
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getBrands = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/brands`, {
          headers: { token: `Bearer ${token}`, pathname},
        },{ cancelToken: source.token });
        setBrandsList(data);
        console.log(data, 'brands');
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
  }, []);

  // get Categories
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCate = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/categories`, {
          headers: { token: `Bearer ${token}`, pathname},
        } , { cancelToken: source.token });
        setCateList(data);

      } catch ({
        response: {
          data: { message: msg },
        },
      }) {}
    };
    getCate();
    return () => {
      source.cancel();
    };
  }, []);

  // get sub Categories
  useEffect(() => {  
    const source = axios.CancelToken.source();
    const getSubCate = async () => {
      try {
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/subCategories/${categoryId}`
        ,{
          headers: { token: `Bearer ${token}`, pathname},
        }, { cancelToken: source.token });
        setSubCateList(data);
      }catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getSubCate();
    return () => {
      source.cancel();
    };
  }, [categoryId]);

  const handelEdit = async (id, setIsEditModalVisible) => {
    console.log(id, 'edit')
    try {
     await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/product/${id}`,
          {name,price,image,albums,description,quickOverview,discount,shipment,brand,inStock,subCategoryId, categoryId },
        {
          headers: { token: `Bearer ${token}`, pathname },
        }
      );
      setIsAdded(true);
      setIsEditModalVisible(false);
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
      setLoading(true);
      const data = { name, price, image, albums, description, quickOverview, discount, shipment, brand, inStock, categoryId }
      if(subCategoryId){
        data.subCategoryId = subCategoryId
      }
      const { data: {message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/product`,data ,         
      {
        headers: { token: `Bearer ${token}`, pathname },
      });
      message.success(msg);
      setIsAdded(true)
      setIsModalVisible(false);
    }catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }finally{
      setLoading(false)
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
        <Input placeholder="Product Name" value={name} onChange={(e)=> setName(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Price" required tooltip="This is a required field"       
      rules={[
          {
            required: true,
            message: 'Missing Price',
          },
        ]}>
        <Input placeholder="Price" type="text" value={price} onChange={(e)=> setPrice(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Description" required tooltip="This is a required field"       
        rules={[
            {
              required: true,
              message: 'Missing description',
            },
          ]}>
        <Input.TextArea value={description} onChange={(e)=> setDescription(e.target.value)}/>
      </Form.Item>
      <Form.Item label="QuickOverview" required tooltip="This is a required field"       
        rules={[
            {
              required: true,
              message: 'Missing quickOverview',
            },
          ]}>
        <Input.TextArea value={quickOverview} onChange={(e)=> setQuickOverview(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Discount" required  >
        <Input  type="text" value={discount} onChange={(e)=> setDiscount(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Shipment" required  >
        <Input type="text" value={shipment} onChange={(e)=> setShipment(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Brand" required tooltip="This is a required field" >
        <Select
            onChange={(value)=> setBrand(value)}
            >
          {brandsList && brandsList.map((item) => {
              return(
                <Option value={item.name} label={item.name} key={item.name}>
                  <div className="demo-option-label-item">
                    {item.name}
                  </div>
                </Option>
              )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Category" required tooltip="This is a required field" >
        <Select
            onChange={(value)=> setCategoryId(value)}
            >
          {cateList && cateList.map((item) => {
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
      {categoryId && (
        <Form.Item label="Sub Category" required tooltip="This is a required field" >
        <Select onChange={(value)=> setSubCategoryId(value)}>
          {subCateList && subCateList.map((item) => {
              return(
                <Option value={item.id} label={item.name} key={item.name}>
                  <div className="demo-option-label-item">
                    {item.name}
                  </div>
                </Option>
              )
          })}
        </Select>
      </Form.Item>
      )}
      <Form.Item label="In Stock" required tooltip="This is a required field" >
        <Select onChange={(value)=> setInStock(value)}>
          <Option value={true} label="Yes" key={true}>
            <div className="demo-option-label-item">
              Yes
            </div>
          </Option>
          <Option value={false} label="False" key={false}>
            <div className="demo-option-label-item">
              False
            </div>
          </Option>
        </Select>
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
      <Form.Item label="Albums" required tooltip="This is a required field" 
      rules={[
          {
            required: true,
            message: 'Missing Image Url',
          },
        ]}>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
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
              title="Products Table"
              extra={
                <>
                  {(user.role === 2 || permission.find((item) => item.methodname === 'post'&& item.link === pathname))&& <HomyModal content={content()} 
                  btnText="Add Product" 
                  ModalTitle="Add New Product" 
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  /> } 
                  <ExportBtn data={data}/>
                </>
              }
            >
              <div className="table-responsive">
            <HomyTable
                  columnsNames={['name', 'image', 'brand', 'price', 'instock', 'shipment','discount', 'createdat', 'category_id']}
                  data={data}
                  className="ant-border-space"
                  isExpandable={true}
                  handelArchive={handelArchive}
                  handleDelete={handleDelete}
                  isDelete={true}
                  isEditing={true}
                  isAction={true}
                  isArchive={true}        
                  content={content}       
                  EditTitle="Edit Product"
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

export default Users;
