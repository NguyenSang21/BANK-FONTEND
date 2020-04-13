import React, { Component, useState, useEffect } from 'react';
import { Table, Input, InputNumber, Form, Button, Icon, Tag } from 'antd';
import { transactionService } from '../../../services';
import moment from 'moment';

const TransHistory = props => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Số giao dịch',
      dataIndex: 'ID_GiaoDich',
      width: '25%',
      editable: true
    },
    {
      title: 'Nội dung',
      dataIndex: 'GhiChu',
      width: '25%',
      editable: true
    },
    {
      title: 'Số tiền',
      dataIndex: 'SoTien',
      width: '20%',
      editable: true
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'LoaiGiaoDich',
      width: '15%',
      editable: true,
      render: (text, record) => {
        switch (record.LoaiGiaoDich) {
          case 'Gui':
            return <Tag color="blue">Gửi tiền</Tag>;
          case 'Nhan':
            return <Tag color="green">Nhận tiền</Tag>;
        }
      }
    },
    {
      title: 'Thời gian',
      dataIndex: 'ThoiGian',
      width: '15%',
      editable: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TrangThai',
      width: '15%',
      editable: true,
      render: (text, record) => {
        switch (record.TinhTrang) {
          case 'DaGui':
            return <Tag color="blue">Đã gửi</Tag>;
          case 'DaNhan':
            return <Tag color="green">Đã nhận</Tag>;
        }
      }
    }
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('user'));

      const result = await transactionService.getTransByUser(userInfo.username);

      if (result && result.success) {
        const data = [];
        result.data.map(item => {
          if(item.LoaiGiaoDich === 'Nhan' || item.LoaiGiaoDich === 'Gui') {
            item.ThoiGian = moment(item.ThoiGian).format('hh:mm:ss DD/MM/YYYY');
            data.push(item)
          }
          return item;
        });
        setData(data);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
};

export default TransHistory;
