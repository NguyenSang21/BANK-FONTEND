import React, { Component, useState, useEffect } from 'react';
import { Form, Table, Button, Tag } from 'antd';
import { debtService } from '../../../services';
import moment from 'moment';

const DebtList = props => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Người bị nợ',
      dataIndex: 'Username',
      width: '25%',
      editable: true
    },
    {
      title: 'Số Tiền',
      dataIndex: 'SoTien',
      width: '15%',
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
          case 'DaNhan':
            return <Tag color="green">Đã trã</Tag>;
          case 'DangDoi':
            return <Tag color="yellow">Đang đòi</Tag>;
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
      title: 'Actions',
      dataIndex: 'actions',
      width: '20%',
      editable: true,
      render: () => (
        <Button
          onClick={e => {
            console.log(e.target);
          }}
        >
          Hủy Nhắc Nợ
        </Button>
      )
    }
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('user'));

      const result = await debtService.getDebtList(userInfo.username);

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

export default DebtList;
