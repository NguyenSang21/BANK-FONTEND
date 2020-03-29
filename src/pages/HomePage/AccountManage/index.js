import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { userService } from '../../../services';

function AccountManage(props) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'ID_TaiKhoanTTTK',
      width: '25%',
      editable: true
    },
    {
      title: 'Số Tiền',
      dataIndex: 'SoDu',
      width: '15%',
      editable: true
    },
    {
      title: 'Loại',
      dataIndex: 'Loai',
      width: '15%',
      editable: true,
      render: (text, record) => {
        console.log(record)
        switch (record.Loai) {
          case 'TT':
            return <Tag color="blue">Thanh toán</Tag>;
          case 'TK':
            return <Tag color="green">Tiết kiệm</Tag>;
        }
      }
    },
    {
      title: 'Đơn vị',
      dataIndex: 'SoDu',
      width: '15%',
      editable: true,
      render: (text, record) => {
        return <Tag color="yellow">VNĐ</Tag>
      }
    },
    {
      title: 'Tình Trạng',
      dataIndex: 'TinhTrang',
      width: '25%',
      editable: true,
      render: (text, record) => {
        console.log(record)
        switch (record.TinhTrang) {
          case 'BinhThuong':
            return <Tag color="green">Bình Thường</Tag>;
          case 'TK':
            return <Tag color="green">Tiết kiệm</Tag>;
          default :
            return <Tag color="green">Bình thường</Tag>;
        }
      }
    },
  ];

  useEffect(() => {
    async function fetchData () {
      setLoading(true)
      const result = await userService.getAccountList()

      if(result && result.success) {
        setData(result.data)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
      <Table
        loading={isLoading}
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: () => {}
        }}
      />
  );
}

export default AccountManage;
