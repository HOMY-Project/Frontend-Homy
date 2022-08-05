import React, { useState, useEffect } from "react";
import { Descriptions, message, Button, Modal} from "antd";
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import "./index.css";

const AddressInfo = () => {
  const [address, setAddress] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const userId = user.id;
  const { confirm } = Modal;

  const handelDeleteAddress = async (id) =>{
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address`, {
        headers: { token: `Bearer ${token}` } }, {id});
      console.log('done delete');
      setAddress((prev) => prev.filter((item) => item.key !== id));
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  }
  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Delete address',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to delete this address?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        handelDeleteAddress(id);
      },
    });
  };
  const handleDefault = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address`, 
      {
        headers: { token: `Bearer ${token}` },
      }, {id});

      setAddress((prevAddress) => prevAddress.map((item) => {
        if (item.id === id) {
          (item.default_address = !item.default_address);
        }
        return item;
      }));
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };
  const handelEdit = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address`,
      {
        headers: { token: `Bearer ${token}` },
      }, {id});

      setAddress((prevAddress) => prevAddress.map((item) => {
        if (item.id === id) {
          (item.edit = !item.edit);
        }
        return item;
      }));
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  }
  
  useEffect(() => {
    // const source = axios.CancelToken.source();
    const getAddress = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/address`;
      try {
        const { data: { data } } = await axios.get(
          url,
          // { cancelToken: source.token },
          {
            headers: { token: `Bearer ${token}` },
          }
        );
        setAddress(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getAddress();
    // return () => {
    //   source.cancel();
    // };
  }, []);

  return (
    <div className="AddressInfo-holder">
      <Container fluid style={{ marginTop: "3%" }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item active>Address Information</Breadcrumb.Item>
        </Breadcrumb>
        {address.length > 0 ? ( 
        <div className="AddressInfo-container"> 
          {address.map((item) => ( 
            <Descriptions title="Address Information"
              style={{ marginBottom: "2%" }}
              column={{
                xxl: 4,
                xl: 3,
                lg: 3,
                md: 3,
                sm: 2,
                xs: 1,
              }}>
              <Descriptions.Item label="City">{item.city}</Descriptions.Item>
              <Descriptions.Item label="Area">{item.area}</Descriptions.Item>
              <Descriptions.Item label="Street">
                {item.street}
              </Descriptions.Item>
              <Descriptions.Item label="Block">{item.block}</Descriptions.Item>
              <Descriptions.Item label="Building">
                {item.building}
              </Descriptions.Item>
              <Descriptions.Item label="">
                <div className="descriptions-btn">
                  <Button type="primary" onClick={() => handelEdit(item.id)} >Edit Address</Button>
                  <Button onClick={() => handleDefault(item.id)}>Make it Default</Button>
                  <Button danger onClick={() => showDeleteConfirm(item.id)}>Delete</Button>
                </div>
              </Descriptions.Item>
            </Descriptions>
          ))}
        </div> ) : ( <div className="AddressInfo-container">
          <div className="AddressInfo-item">
            <Alert key='primary' variant='primary'>
              <Alert.Heading style={{ fontWeight: 'bold' , fontSize: '18px'}}>You have no address</Alert.Heading>
          </Alert>
          </div>
        </div>)}
        <Link to="/addAddress">
            <Button type="primary" style={{ marginTop: "2%" }}> Add Address </Button>
        </Link>
      </Container>
    </div>
  );
}
          // <div className="AddressInfo-item">   
          //   <div className="AddressInfo-item-name">{item.name}</div> 
          //   <div className="AddressInfo-item-address">{item.address}</div>
          //   <div className="AddressInfo-item-phone">{item.phone}</div>
          //   <div className="AddressInfo-item-default">{item.default_address ? "Default" : "Not Default"}</div>
          //   <div className="AddressInfo-item-action">
          //     <Link to={`/address/${item.id}`}>Edit</Link>
          //     <Button type="danger" onClick={() => showDeleteConfirm(item.id)}>Delete</Button>
          //   </div>
          // </div>

//         <Descriptions title="Address Information"       
//         column={{
//         xxl: 4,
//         xl: 3,
//         lg: 3,
//         md: 3,
//         sm: 2,
//         xs: 1,
//       }}>
//           <Descriptions.Item label="City">Zhou Maomao</Descriptions.Item>
//           <Descriptions.Item label="Area">1810000000</Descriptions.Item>
//           <Descriptions.Item label="Street">
//             Hangzhou, Zhejiang
//           </Descriptions.Item>
//           <Descriptions.Item label="Block">empty</Descriptions.Item>
//           <Descriptions.Item label="Building">
//             No. 18, Wantang Road
//           </Descriptions.Item>
//           <Descriptions.Item label="">
//             <div className="descriptions-btn">
//               <Button type="primary">Edit Address</Button>
//               <Button>Make it Default</Button>
//               <Button danger onClick={() => showDeleteConfirm()}>Delete</Button>
//             </div>
//           </Descriptions.Item>
//         </Descriptions>
//         <Link to="/addAddress">
//          <Button type="primary" style={{ marginTop: "2%" }}> Add Address </Button>
//         </Link>
//       </Container>
//     </div>
//   );
// };

export default AddressInfo;
