import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, message, Tag } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setOrder } from "../../Redux/features/singleOrderSlice";
import Highlighter from 'react-highlight-words';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Heading from '../Heading';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import './index.css';

const Orders = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData ] = useState([]);
  const searchInput = useRef(null);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getOrders = async () => {
      try {
        const { data: { data } } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${user.id}/orders`, { headers: { token: `Bearer ${token}` } },
          { cancelToken: source.token }
        );
        setData(data);
        console.log(data, 'orders');
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getOrders();
    return () => {
      source.cancel();
    };
  }, []);

  const getSingleOrder = async (id) => {
    try {
      const { data: { data  } } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/single-order/${id}`,
      { headers: { token: `Bearer ${token}` } });
      dispatch(setOrder(data));
      console.log(data, 'data from order num');
      navigate('/singleOrder');
    } catch(err){
      console.error(err);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Order',
      dataIndex: 'order_number',
      key: 'order_number',
      width: '20%',
      ...getColumnSearchProps('order_number'),
      render: (order_number) => <Button type="submit" onClick={() => getSingleOrder(order_number) }>{order_number}</Button>
    },
    {
      title: 'Date',
      dataIndex: 'createdat',
      key: 'createdat',
      width: '20%',
      render: (createdat) => (
        <span> {createdat.split('T')[0]} </span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      ...getColumnSearchProps('amount'),
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        ...getColumnSearchProps('status'),
        render: (status) => (
            <Tag color={status === 'Pending' ? 'orange' : 'green'}>{status}</Tag>
        )
      },
      {
        title: 'Review',
        dataIndex: 'Review',
        key: 'Review',
      },
  ];
  return (
    <Container fluid style={{ marginTop: '3%' }} className="order-holder">
        <Breadcrumb>
        <Breadcrumb.Item href="/">Account</Breadcrumb.Item>
        <Breadcrumb.Item active>Orders</Breadcrumb.Item>
        </Breadcrumb>
        <Heading heading="All Orders" />
        <Table columns={columns} dataSource={data} />
  </Container>
  )
  ;
};

export default Orders;