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
      width: '10%',
      fixed: 'left',
      editable: true
    },
    {
      title: 'STK người nhận',
      dataIndex: 'ID_TaiKhoan_TTTK_B',
      width: '10%',
      editable: true
    },
    {
      title: 'Biệt Danh',
      dataIndex: 'BietDanh',
      width: '10%',
      render: (text, record) => {
        return <Tag color="blue">{record.BietDanh}</Tag>;
      }
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'TenNganHang',
      width: '10%',
      render: (text, record) => {
        return <Tag color="blue">{record.TenNganHang}</Tag>;
      }
    },
    {
      title: 'Số tiền',
      dataIndex: 'SoTien',
      width: '10%',
      editable: true
    },
    {
      title: 'Người trả phí',
      dataIndex: 'NguoiTraPhi',
      width: '10%',
      editable: true,
      render: (text, record) => {
        return <Tag color="pink">{record.NguoiTraPhi}</Tag>;
      }
    },
    {
      title: 'Nội dung',
      dataIndex: 'GhiChu',
      width: '25%',
      editable: true
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'LoaiGiaoDich',
      width: '10%',
      editable: true,
      render: (text, record) => {
        switch (record.LoaiGiaoDich) {
          case 'Gui':
            return <Tag color="blue">Gửi tiền</Tag>;
          case 'Nhan':
            return <Tag color="green">Nhận tiền</Tag>;
          case 'Doi':
            return <Tag color="orange">Đòi tiền</Tag>;
          case 'No':
            return <Tag color="red">Nợ</Tag>;
          case 'TraNo':
            return <Tag color="orange">Trả nợ</Tag>;
          case 'NhanTienNo':
            return <Tag color="green">Nhận tiền nợ</Tag>;
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
      fixed: 'right',
      width: '10%',
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
          case 'HuyDoi':
            return <Tag color="orange">Hủy đòi</Tag>;
          case 'DaTraNo':
            return <Tag color="green">Đã trả nợ</Tag>;
          case 'DangNo':
            return <Tag color="yellow">Đang nợ</Tag>;
          case 'DaNhanTienNo':
            return <Tag color="green">Đã Nhận tiền nợ</Tag>;
          case 'DaTra':
            return <Tag color="green">Đã trả</Tag>;
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
          item.ThoiGian = moment(item.ThoiGian).format('hh:mm:ss DD/MM/YYYY');
          data.push(item);

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
      scroll={{ x: 2000 }}
      loading={isLoading}
      rowKey="ID_GiaoDich"
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
