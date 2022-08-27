/* eslint-disable no-lone-blocks */
import { SearchOutlined, WarningFilled, CheckCircleFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Avatar, Modal, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import './table.css';
import { useSelector } from 'react-redux';

const HomyTable = ({ columnsNames, data, isEditing, content, isExpandable, isDelete,isArchive, handleDelete, handelArchive, EditTitle, isAction,pathname }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [editRecord, setEditRecord ] = useState('');
  const searchInput = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, permission } = useSelector((state) => state.auth);
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

  columnsNames.map((item ) => {
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
    } : item === 'instock' || item === 'has_sub_categories' ? {
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      render: (status) => (
        status ? <CheckCircleFilled style={{color: "#52c41a", fontSize: '18px' }}/> : <WarningFilled style={{color: "#eb2f96", fontSize: '18px'}}/>
    )
    }: item === 'createdat'? {
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      render: (status) => (
        status.toString().split('T')[0]
    )
    }: item === 'category_id'? {
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      ...getColumnSearchProps(item),
      // render: (_,record)=> record.id && record.category_id && console.log(getCategoryName(record.id))
    } : {
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      editable: true,
      ...getColumnSearchProps(item),
    })
  });

  if(isAction){
    columns.push({
      title: 'Operation',
      key: 'Operation',
      width: '20%',
      render: (_, record) => (
          <>
            {isDelete ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id ? record.id : record.userid)}>
              {(user.role === 2 || permission.find((item) => item.methodname === 'delete'&& item.link === pathname))&&<Button danger > Delete </Button>}
            </Popconfirm>
            ) : null}
            {isArchive ? (
            <Popconfirm title="You are Sure?" onConfirm={() => handelArchive(record.id, record.archived )}>
                {(user.role === 2 || permission.find((item) => item.methodname === 'put'&& item.link === pathname))&&<Button style={{marginRight: "2%"}} > {record.archived === true ? 'Not archive' : 'Archive'} </Button>}
            </Popconfirm>
            ) : null}
            {isEditing ? (
              <Space size="middle">
              {(user.role === 2 || permission.find((item) => item.methodname === 'put'&& item.link === pathname))&&<Button onClick={() => editItemHandel(record)}>Edit</Button>}
            </Space>
            ): null}
            
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
      rowKey={(record) => record.id}
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
            <div
            style={{
              margin: 0,
              display: 'flex',
              marginTop: '2%' 
            }}
          >
            {record.albums.map(album => <img src={album} alt={album} style={{width: '100px' , marginLeft: "2%"}} />)}
            </div>
          </>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      />
    ) : (
      <Table
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={data}
      bordered 
      />
    )}
      {isEditing && (
        <Modal title={EditTitle} visible={isModalVisible} 
        footer={null}
        onOk={()=>  setIsModalVisible(false)} onCancel={()=>  setIsModalVisible(false)}
        >
          {content(editRecord, setIsModalVisible)}
        </Modal>
      )}
      </>
  )
};

export default HomyTable;
