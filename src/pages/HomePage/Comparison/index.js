import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { transactionService } from '../../../services';

const Comparison = props => {
  const columns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'ID_GiaoDich',
      width: '10%',
      editable: true,
      fixed: 'left',
    },
    {
      title: 'Tài khoản A',
      dataIndex: 'ID_TaiKhoan_TTTK_A',
      width: '10%',
      editable: true
    },
    {
      title: 'Họ tên A',
      dataIndex: 'Username_A',
      width: '10%',
      editable: true
    },
    {
      title: 'Tên ngân hàng A',
      dataIndex: 'TenNganHang_A',
      width: '10%',
      editable: true
    },
    {
      title: 'Tài khoản B',
      dataIndex: 'ID_NganHangLienKet_B',
      width: '10%',
      editable: true
    },
    {
      title: 'Họ tên B',
      dataIndex: 'Username_B',
      width: '10%',
      editable: true
    },
    {
      title: 'Tài khoản B',
      dataIndex: 'ID_NganHangLienKet_B',
      width: '10%',
      editable: true
    },
    {
      title: 'Tên ngân hàng B',
      dataIndex: 'TenNganHang_B',
      width: '10%',
      editable: true
    },
    {
      title: 'Thời gian',
      dataIndex: 'ThoiGian',
      width: '10%',
      editable: true
    },
    {
      title: 'Tình trạng',
      dataIndex: 'TinhTrang',
      width: '10%',
      fixed: 'right',
      editable: true,
      render: (text, record) => {
        switch (record.TinhTrang) {
          case 'DaGui':
            return <Tag color="blue">Đã gửi</Tag>;
          case 'DaTra':
            return <Tag color="green">Đã trả</Tag>;
          case 'DaNhan':
            return <Tag color="green">Đã nhận</Tag>;
          case 'DangDoi':
            return <Tag color="yellow">Đang chờ</Tag>;
        }
      }
    }
  ];

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const result = await transactionService.getAll()
      console.log("DATA=", result)
      
      if (result && result.success) {
        setData(result.data)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={data}
      scroll={{ x: 1500 }} />
  )
}

export default Comparison;
