import React, { Component, useState, useEffect } from 'react';
import { Form, Table, Button, Tag, notification } from 'antd';
import { debtService, transactionService } from '../../../services';
import moment from 'moment';
import DialogOTP from './DialogOTP';
import DialogNote from './DialogNote';
import shortid from 'shortid';

const DebtList = props => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [reload, setReload] = useState([]);
  const [cancelDebtData, setCancelDebtData] = useState([]);
  const [openCancelDebt, setOpenCancelDebt] = useState(false);

  const columns = [
    {
      title: 'Mã GD',
      dataIndex: 'ID_GiaoDich',
      width: '10%',
      fixed: 'left',
      editable: true,
      key: 'ID_GiaoDich'
    },
    {
      title: 'Người nhắc nợ',
      dataIndex: 'Username',
      key: 'Username',
      width: '20%',
      editable: true,
      render: (text, record) => {
        switch (record.LoaiGiaoDich) {
          case 'Doi':
          case 'NhanTienNo':
            const userInfo = JSON.parse(localStorage.getItem('user'));
            return userInfo.username;
          case 'No':
          case 'TraNo':
            return record.Username;
        }
      }
    },
    {
      title: 'Người bị nợ',
      dataIndex: 'Username',
      key: 'Username1',
      width: '20%',
      editable: true,
      render: (text, record) => {
        switch (record.LoaiGiaoDich) {
          case 'Doi':
          case 'NhanTienNo':
            return record.Username;
          case 'No':
          case 'TraNo':
            const userInfo = JSON.parse(localStorage.getItem('user'));
            return userInfo.username;
        }
      }
    },
    {
      title: 'Số Tiền',
      dataIndex: 'SoTien',
      key: 'SoTien',
      width: '15%',
      editable: true
    },
    {
      title: 'Ngân hàng',
      dataIndex: 'TenNganHang',
      key: 'TenNganHang',
      width: '10%',
      editable: true,
      render: (text, record) => {
        return <Tag color="blue">{record.TenNganHang}</Tag>;
      }
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'GhiChu',
      key: 'GhiChu',
      width: '30%',
      editable: true
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'LoaiGiaoDich',
      key: 'LoaiGiaoDich',
      width: '10%',
      editable: true,
      render: (text, record) => {
        switch (record.LoaiGiaoDich) {
          case 'TraNo':
            return <Tag color="orange">Trả nợ</Tag>;
          case 'NhanTienNo':
            return <Tag color="green">Nhận tiền nợ</Tag>;
          case 'Doi':
            return <Tag color="orange">Đòi tiền</Tag>;
          case 'No':
            return <Tag color="red">Nợ</Tag>;
        }
      }
    },
    {
      title: 'Thời gian',
      dataIndex: 'ThoiGian',
      key: 'ThoiGian',
      width: '15%',
      editable: true
    },
    {
      title: 'Tình trạng',
      dataIndex: 'TinhTrang',
      key: 'TinhTrang',
      width: '10%',
      editable: true,
      render: (text, record) => {
        switch (record.TinhTrang) {
          case 'DangDoi':
            return <Tag color="yellow">Đang đòi</Tag>;
          case 'DaTra':
            return <Tag color="green">Đã trả</Tag>;
          case 'HuyDoi':
            return <Tag color="orange">Hủy đòi</Tag>;
          case 'DaNhanTienNo':
            return <Tag color="green">Đã nhận tiền nợ</Tag>;
          case 'DangNo':
            return <Tag color="red">Đang nợ</Tag>;
        }
      }
    },
    {
      title: 'Actions 1',
      dataIndex: 'actions',
      key: 'actions',
      width: '10%',
      editable: true,
      render: (text, record) => {
        if (record.TinhTrang === 'DangNo') {
          return (
            <Button danger onClick={() => handlePayDebt(record)}>
              Trả nợ
            </Button>
          );
        }
        return null;
      }
    },
    {
      title: 'Actions 2',
      dataIndex: 'actions',
      key: 'actions',
      width: '11%',
      editable: true,
      render: (text, record) => {
        if (record.TinhTrang === 'DangDoi' || record.TinhTrang === 'DangNo') {
          return (
            <Button onClick={e => hanbleCancelDebt(record)}>Hủy Nhắc Nợ</Button>
          );
        }
        return null;
      }
    }
  ];

  const handlePayDebt = async values => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const formData = {
      accountNumberA: values.TTbangTK,
      accountNumberB: values.ID_TaiKhoan_TTTK_B,
      amount: values.SoTien,
      note: 'Tra nợ nhé',
      payer: 'A',
      username: userInfo.username,
      transType: 'TraNo',
      ID_TraNo: values.ID_GiaoDich
    };
    console.log(formData);

    const result = await transactionService.getOTP(userInfo.username);

    if (result && result.success) {
      setFormData(formData);
      setOpenModal(true);
    }
  };

  const hanbleCancelDebt = async record => {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    setCancelDebtData({
      ID_GiaoDich: record.ID_GiaoDich,
      Username_IN: userInfo.username
    });

    setOpenCancelDebt(true);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('user'));

      const result = await debtService.getDebtList(userInfo.username);

      if (result && result.success) {
        const data = [];
        result.data.map(item => {
          if (item.LoaiGiaoDich === 'No' || 
           item.LoaiGiaoDich === 'Doi' ||
           item.LoaiGiaoDich === 'NhanTienNo' ||
          item.LoaiGiaoDich === 'TraNo' || item.LoaiGiaoDich === 'NhanTienNo') {
            item.ThoiGian = moment(item.ThoiGian).format('hh:mm:ss DD/MM/YYYY');
            data.push(item);
          }
          return item;
        });
        setData(data);
        setLoading(false);
      }
    }

    fetchData();
  }, [reload]);

  return (
    <>
      <Table
        key="name"
        loading={isLoading}
        bordered
        rowKey={shortid}
        scroll={{ x: 2200 }}
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: () => {}
        }}
      />
      <DialogOTP
        reload={reload}
        open={openModal}
        data={formData}
        handleClose={() => setOpenModal(false)}
      />
      <DialogNote
        reload={reload}
        open={openCancelDebt}
        data={cancelDebtData}
        handleClose={() => setOpenCancelDebt(false)}
      />
    </>
  );
};

export default DebtList;
