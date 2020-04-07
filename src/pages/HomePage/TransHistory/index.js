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
            return <Tag color="yellow">Gửi tiền</Tag>;
          case 'Nhan':
            return <Tag color="green">Nhận tiền</Tag>;
          case 'Doi':
            return <Tag color="red">Đòi tiền</Tag>;
          case 'TraNo':
            return <Tag color="yellow">Trả nợ</Tag>;
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
          case 'DangDoi':
            return <Tag color="yellow">Đang đòi</Tag>;
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
        let data = result.data;
        data = data.map(item => {
          item.ThoiGian = moment(item.ThoiGian).format('hh:mm:ss DD/MM/YYYY');
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
