import React , { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  Select,
  Descriptions,
  Spin,
  message,
  Tag
} from "antd";
import ProductInfo from '../components/ProductInfo';



function Orders() {
  const [status, setStatus ] = useState('');
  const [isArchived, setIsArchived ] = useState(false); // to update data after archive action
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { pathname } = useLocation();
  const { token, user, permission } = useSelector((state) => state.auth);
  const { Option } = Select
  
  const handelChangeStatus = async (id) =>{
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/order/${id}/status`,{ status },
      { headers: { token: `Bearer ${token}`, pathname } });
      message.success("Status updated successfully");
      setIsArchived(true)
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getOrders = async () => {
      try {
        setLoading(true)
        const { data: { data } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/dashboard/orders`,
        {
          headers: { token: `Bearer ${token}`, pathname },
        }, 
        { cancelToken: source.token });
        setData(data);
        console.log(data, 'orders');
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }finally {
        setLoading(false)
      }
    };
    getOrders();
    return () => {
      source.cancel();
    };
  }, [isArchived]);

  return (
    <>
      {/* <Row gutter={[24, 0]}>
        <Col xs={24} md={16}>
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={12} className="mb-24">
              <Card
                title={wifi}
                bordered={false}
                className="card-credit header-solid h-ful"
              >
                <h5 className="card-number">4562 1122 4594 7852</h5>

                <div className="card-footer">
                  <div className="mr-30">
                    <p>Card Holder</p>
                    <h6>Jack Peterson</h6>
                  </div>
                  <div className="mr-30">
                    <p>Expires</p>
                    <h6>11/22</h6>
                  </div>
                  <div className="card-footer-col col-logo ml-auto">
                    <img src={mastercard} alt="mastercard" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Card bordered={false} className="widget-2 h-full">
                <Statistic
                  title={
                    <>
                      <div className="icon">{angle}</div>
                      <h6>Salary</h6>
                      <p>Belong Interactive</p>
                    </>
                  }
                  value={"$2,000"}
                  prefix={<PlusOutlined />}
                />
              </Card>
            </Col>
            <Col xs={12} xl={6} className="mb-24">
              <Card bordered={false} className="widget-2 h-full">
                <Statistic
                  title={
                    <>
                      <div className="icon">
                        <img src={paypal} alt="paypal" />
                      </div>
                      <h6>Paypal</h6>
                      <p>Freelance Paymente</p>
                    </>
                  }
                  value={"$49,000"}
                  prefix={<PlusOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} className="mb-24">
              <Card
                className="header-solid h-full ant-card-p-0"
                title={
                  <>
                    <Row
                      gutter={[24, 0]}
                      className="ant-row-flex ant-row-flex-middle"
                    >
                      <Col xs={24} md={12}>
                        <h6 className="font-semibold m-0">Payment Methods</h6>
                      </Col>
                      <Col xs={24} md={12} className="d-flex">
                        <Button type="primary">ADD NEW CARD</Button>
                      </Col>
                    </Row>
                  </>
                }
              >
                <Row gutter={[24, 0]}>
                  <Col span={24} md={12}>
                    <Card className="payment-method-card">
                      <img src={mastercard} alt="mastercard" />
                      <h6 className="card-number">**** **** **** 7362</h6>
                      <Button type="link" className="ant-edit-link">
                        {pencil}
                      </Button>
                    </Card>
                  </Col>
                  <Col span={24} md={12}>
                    <Card className="payment-method-card">
                      <img src={visa} alt="visa" />
                      <h6 className="card-number">**** **** **** 3288</h6>
                      <Button type="link" className="ant-edit-link">
                        {pencil}
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Invoices</h6>]}
            extra={[
              <Button type="primary">
                <span>VIEW ALL</span>
              </Button>,
            ]}
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  actions={[<Button type="link">{download} PDF</Button>]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className="amount">{item.amount}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row> */}
      <Row gutter={[24, 0]} className="orders-holder-dashboard">
        <Col span={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0">Billing Information</h6>]}
            bodyStyle={{ paddingTop: "0" }}
          >
            {loading && <div style={{display: "flex"}}><Spin /></div>}
            <Row gutter={[24, 24]}>
              {data.map((order) => (
                <Col span={24} key={order.id} className="card-billing-info" >
                  <Card bordered="false">
                    <div style={{display: 'flex' , justifyContent: 'space-between'}}>
                      <div className="col-info">
                        <Descriptions title={'Order Number' + " : " +order.order_number}>
                          <Descriptions.Item label="Name" span={3}>
                            {order.name}
                          </Descriptions.Item>
                          <Descriptions.Item label="Email Address" span={3}>
                          {order.email}
                          </Descriptions.Item>
                          <Descriptions.Item label="Phone Number" span={3}>
                            {order.phone}
                          </Descriptions.Item>
                          <Descriptions.Item label="Payment Method" span={3}>
                            {order.payment}
                          </Descriptions.Item>
                          <Descriptions.Item label="Shipment Address" span={3}>
                            {order.addresses[0]} ,{" "} {order.addresses[1]},{" "} {order.addresses[2]}, {" "}{order.addresses[3]}
                          </Descriptions.Item>
                          <Descriptions.Item label="Order Amount" span={3}>
                            {order.amount} KWD
                          </Descriptions.Item>
                          <Descriptions.Item label="Status" span={3}>
                            <Tag color={order.status === 'pending' ? "geekblue" : order.status === 'reject' ? "red" : "green"}> {order.status}</Tag>
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                      <div className="">
                        <Select
                        placeholder="Change Order Status"
                        defaultValue={order.status}
                          // style={{
                          //   width: 120,
                          // }}
                          onChange={(value) => (setStatus(value), handelChangeStatus(order.id))}
                        >
                          <Option value="pending">Pending</Option>
                          <Option value="complete">Complete</Option>
                          <Option value="reject">Reject</Option>
                        </Select>
                      </div>
                    </div>
                    <div>
                        {order.products?.map((prod) => <ProductInfo product={prod}/> )} 
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Orders;
