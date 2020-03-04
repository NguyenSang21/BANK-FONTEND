import React, { useState } from 'react';
import { Table, Form, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const originData = [];

for (let i = 0; i < 10; i++) {
  originData.push({
    stk: 123456780 + i,
    accountType: i / 2 === 0 ? 'Tiết kiệm' : 'Thanh toán',
    amount: 5000000 * (i + 1),
    moneyType: i / 2 === 0 ? 'VNĐ' : 'USD'
  });
}

function AccountManage(props) {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const edit = record => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'stk',
      width: '25%',
      editable: true
    },
    {
      title: 'Loại Tài Khoản',
      dataIndex: 'accountType',
      width: '25%',
      editable: true
    },
    {
      title: 'Số Tiền',
      dataIndex: 'amount',
      width: '15%',
      editable: true
    },
    {
      title: 'Loại Tiền',
      dataIndex: 'moneyType',
      width: '15%',
      editable: true
    },
    {
      title: 'Actions',
      dataIndex: 'detail',
      width: '20%',
      editable: true,
      render: (text, record) => {
        return (
          <Button
            onClick={() => {
              console.log(record);
            }}
          >
            <DeleteOutlined />
            Xem chi tiết
          </Button>
        );
      }
    }
  ];

  return (
    <Form form={form} component={false}>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel
        }}
      />
    </Form>
  );
}

export default AccountManage;
