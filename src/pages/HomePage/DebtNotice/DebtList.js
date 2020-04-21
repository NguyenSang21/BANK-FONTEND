import React, { Component, useState, useEffect } from 'react';
import { Form, Table, Button, Tag, notification  } from 'antd';
import { debtService, transactionService } from '../../../services';
import moment from 'moment';
import DialogOTP from './DialogOTP';

const DebtList = props => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState([])
  const [reload, setReload] = useState([])
  const columns = [
    {
      title: 'Mã GD',
      dataIndex: 'ID_GiaoDich',
      width: '15%',
      editable: true
    },
    {
      title: 'Người nhắc nợ',
      dataIndex: 'Username',
      width: '25%',
      editable: true,
      render: (text, record) => {
        switch(record.LoaiGiaoDich) {
          case 'Doi':
            const userInfo = JSON.parse(localStorage.getItem('user'))
            return userInfo.username
          case 'No':
            return record.Username
        }
      }
    },
    {
      title: 'Người bị nợ',
      dataIndex: 'Username',
      width: '25%',
      editable: true,
      render: (text, record) => {
        switch(record.LoaiGiaoDich) {
          case 'Doi':
            return record.Username
          case 'No':
            const userInfo = JSON.parse(localStorage.getItem('user'))
            return userInfo.username
        }
      }
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
            return <Tag color="green">Đòi tiền</Tag>;
          case 'TraNo':
            return <Tag color="yellow">Trả nợ</Tag>;
          case 'DaNhan':
            return <Tag color="green">Đã trã</Tag>;
          case 'DangDoi':
            return <Tag color="yellow">Đang đòi</Tag>;
          case 'No':
            return <Tag color="red">Nợ</Tag>;
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
      title: 'Loại giao dịch',
      dataIndex: 'LoaiGiaoDich',
      width: '15%',
      editable: true,
      render: (text, record) => {
        switch (record.TinhTrang) {
          case 'DangNo':
            return <Tag color="red">Đang nợ</Tag>;
          case 'DaTraNo':
            return <Tag color="green">Đã trả nợ</Tag>;
          case 'DangDoi':
            return <Tag color="red">Đang đòi</Tag>;
          case 'DaNhan':
            return <Tag color="green">Đã nhận</Tag>;
        }
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '20%',
      editable: true,
      render: (text, record) => {
        if (record.LoaiGiaoDich === 'Doi' && record.TinhTrang === 'DangDoi') {
          return <Button
            onClick={e => hanbleCancelDebt(record)}
          >
            Hủy Nhắc Nợ
        </Button>
        } else if(record.LoaiGiaoDich === 'No' && record.TinhTrang === 'DangNo' ) {
          return <Button
            danger
            onClick={() => handlePayDebt(record)}
          >
            Trả nợ
        </Button>
        }
        return null
      }
    }
  ];

  const handlePayDebt = async (values) => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const formData = {
      accountNumberA: values.TTbangTK,
      accountNumberB: values.ID_TaiKhoan_TTTK_B,
      amount: values.SoTien,
      note: 'Tra nợ nhé',
      payer: 'A',
      username: userInfo.username,
      transType: 'TraNo',
      ID_TraNo: values.ID_GiaoDich
    }
    console.log(formData)

    const result = await transactionService.getOTP(userInfo.username)

    if (result && result.success) {
      setFormData(formData)
      setOpenModal(true)
    }
  }

  const hanbleCancelDebt = async (record) => {
    console.log(record)
    const result = await debtService.removeDebt(record.ID_GiaoDich)

    if (result && result.success) {
      notification.success({
        message: 'Thông báo',
        description: 'Xóa thành công!',
      })
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('user'));

      const result = await debtService.getDebtList(userInfo.username);

      if (result && result.success) {
        const data = []
        result.data.map(item => {
          if (item.LoaiGiaoDich === 'No' || item.LoaiGiaoDich === 'Doi') {
            item.ThoiGian = moment(item.ThoiGian).format('hh:mm:ss DD/MM/YYYY')
            data.push(item)
          }
          return item;
        });
        setData(data);
        setLoading(false);
      }
    }
  } 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('user'));

      const result = await debtService.getDebtList(userInfo.username);

      if (result && result.success) {
        const data = []
        result.data.map(item => {
          if (item.LoaiGiaoDich === 'No' || item.LoaiGiaoDich === 'Doi') {
            item.ThoiGian = moment(item.ThoiGian).format('hh:mm:ss DD/MM/YYYY')
            data.push(item)
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
      loading={isLoading}
      bordered
      dataSource={data}
      columns={columns}
      rowClassName="editable-row"
      pagination={{
        onChange: () => { }
      }}
    />
      <DialogOTP open={openModal} data={formData} handleClose={() => setOpenModal(false)} />
    </>
    
  );
};

export default DebtList;
