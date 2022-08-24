import { SearchOutlined, WarningFilled, CheckCircleFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Avatar, Modal, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import './table.css';

const HomyTable = ({ columnsNames, data, isEditing, content, isExpandable, isDelete, handleDelete, handelArchive }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [editRecord, setEditRecord ] = useState('');
  const searchInput = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns=[];
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
  
  const editItemHandel = (record) => {
    setEditRecord(record)
    setIsModalVisible(true)
  }

  columnsNames.map((item, index) => {
    columns.push(  item === 'image' ? 
    {
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      editable: true,
      ...getColumnSearchProps(item),
      render: (status) => (
        <Avatar
        className="shape-avatar"
        shape="square"
        size={50}
        src={status}
      />
    )
    } : item === 'instock' ? {
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      editable: true,
      ...getColumnSearchProps(item),
      render: (status) => (
        status ? <CheckCircleFilled style={{color: "#52c41a"}}/> : <WarningFilled style={{color: "#eb2f96"}}/>
    )
    }: item === 'createdat'? {
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      editable: true,
      ...getColumnSearchProps(item),
      render: (status) => (
        status.toString().split('T')[0]
    )
    }: item === 'category_id'? {
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      ...getColumnSearchProps(item),
      // onCell: async (record, rowIndex) => { 

      //   if(record.id){
      //     try{
      //     const {data: { data } } =  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/categories/${record.id}`)  
      //     return <span>{data[0]?.name}</span> 
          
      //     }catch ({ response: { data: { message: msg }}}) {
      //      alert(msg)
      //     }
      //   }
      //   // console.log(text, 'text' , record, index, 'index');
      // }
    } : {
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      editable: true,
      ...getColumnSearchProps(item),
    })
  });


  if(isEditing){
    columns.push({
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => editItemHandel(record)}>Edit</Button>
        </Space>
      ),
    });
  }
  if(isDelete){
    columns.push({
      title: 'Action',
      key: 'Action',
      width: '20%',
      render: (_, record) => (
          <>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
          <Button danger > Delete </Button>
        </Popconfirm>
        <Popconfirm title="You are Sure?" onConfirm={() => handelArchive(record.id, record.archived )}>
            <Button style={{marginRight: "2%"}} > {record.archived === true ? 'Not archive' : 'Archive'} </Button>
        </Popconfirm>
          </>
      )
    });
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  return (
    <>
    {isExpandable ? (
    <Table
      columns={columns}
      dataSource={data}
      bordered 
      expandable={{
        expandedRowRender: (record) => (
          <>
          <p
            style={{
              margin: 0,
            }}
          >
            Description: {record.description}
          </p>
          <p
            style={{
              margin: 0,
            }}
          >
             Overview: {record.quick_overview}
            </p>
          </>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      />
    ) : (
      <Table
      columns={columns}
      dataSource={data}
      bordered 
      />
    )}
      {isEditing && (
        <Modal title="Edit Banner" visible={isModalVisible} 
        footer={null}
        onOk={()=>  setIsModalVisible(false)} onCancel={()=>  setIsModalVisible(false)}
        >
          {content(editRecord)}
        </Modal>
      )}
      </>
  )
};

export default HomyTable;
