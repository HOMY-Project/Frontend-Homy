import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Avatar, InputNumber, Form, Typography, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import './table.css';

const HomyTable = ({ columnsNames, data, setData }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  
  // const isEditing = (record) => record.key === editingKey;
  // // console.log(editingKey, 'editingkey');

  // const edit = (record) => {
  //   form.setFieldsValue({
  //     image: '',
  //     name: '',
  //     place: '',
  //     ...record,
  //   });
  //   setEditingKey(record.key);

  // };

  // const cancel = () => {
  //   setEditingKey('');
  // };

  // const save = async (key) => {
  //   try {
  //     const row = await form.validateFields();
  //     const newData = [...data];
  //     const index = newData.findIndex((item) => key === item.key);

  //     if (index > -1) {
  //       const item = newData[index];
  //       newData.splice(index, 1, { ...item, ...row });
  //       setData(newData);
  //       setEditingKey('');
  //     } else {
  //       newData.push(row);
  //       setData(newData);
  //       setEditingKey('');
  //     }
  //   } catch (errInfo) {
  //     console.log('Validate Failed:', errInfo);
  //   }
  // }; 
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

    // {
    //   title: columnsNames[0],
    //   dataIndex: columnsNames[0],
    //   key: columnsNames[0],
    //   width: '20%',
    //   editable: true,
    //   render: (status) => (
    //     <Avatar
    //     className="shape-avatar"
    //     shape="square"
    //     size={50}
    //     src={status}
    //   />
    // )
    // },
    // {
    //   title: columnsNames[1],
    //   dataIndex: columnsNames[1],
    //   key: columnsNames[1],
    //   width: '20%',
    //   editable: true,
    //   ...getColumnSearchProps(columnsNames[1]),
    // },
    // {
    //   title: columnsNames[2],
    //   dataIndex: columnsNames[2],
    //   key: columnsNames[2],
    //   width: '20%',
    //   editable: true,
    //   ...getColumnSearchProps(columnsNames[1]),

    // },
    // {
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   render: (_, record) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link
    //           onClick={() => save(record.key)}
    //           style={{
    //             marginRight: 8,
    //           }}
    //         >
    //           Save
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
    //         Edit
    //       </Typography.Link>
    //     );
    //   },
    // },
  ];
  columnsNames.map((item, index) => {
    if(item === 'image'){
      columns.push({
        title: item,
        dataIndex: item,
        key: item,
        width: '20%',
        editable: true,
        render: (status) => (
          <Avatar
          className="shape-avatar"
          shape="square"
          size={50}
          src={status}
        />
      )
      })
    }
    columns.push({
      title: item,
      dataIndex: item,
      key: item,
      width: '20%',
      editable: true,
      ...getColumnSearchProps(item),
    });
  });
  // const mergedColumns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }

  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       inputType: col.dataIndex === 'age' ? 'number' : 'text',
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       editing: isEditing(record),
  //     }),
  //   };
  // });

  // const EditableCell = ({
  //   editing,
  //   dataIndex,
  //   title,
  //   inputType,
  //   record,
  //   index,
  //   children,
  //   ...restProps
  // }) => {
  //   const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  //   return (
  //     <td {...restProps}>
  //       {editing ? (
  //         <Form.Item
  //           name={dataIndex}
  //           style={{
  //             margin: 0,
  //           }}
  //           rules={[
  //             {
  //               required: true,
  //               message: `Please Input ${title}!`,
  //             },
  //           ]}
  //         >
  //           {inputNode}
  //         </Form.Item>
  //       ) : (
  //         children
  //       )}
  //     </td>
  //   );
  // };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       width: '30%',
//       ...getColumnSearchProps('name'),
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//       width: '20%',
//       ...getColumnSearchProps('age'),
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//       ...getColumnSearchProps('address'),
//       sorter: (a, b) => a.address.length - b.address.length,
//       sortDirections: ['descend', 'ascend'],
//     },
//   ];
  return (
    <Form form={form} component={false}>
    <Table 
    // columns={mergedColumns} 
    columns={columns}
    dataSource={data} 
    bordered
    // components={{
    //   body: {
    //     cell: EditableCell,
    //   },
    // }}
    // rowClassName="editable-row"
    // pagination={{
    //   onChange: cancel,
    // }}
    />
    </Form>
  )
};

export default HomyTable;



 
// export { searchText, setSearchText, searchedColumn, setSearchedColumn, handleSearch, handleReset };
// export const getColumnSearchProps ;