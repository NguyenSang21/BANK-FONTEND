import React, { useEffect, useState } from 'react';
import {
  Table,
  Form,
  Row,
  Button,
  Icon,
  Col,
  Card,
  Input,
  Radio,
  Tag,
  Select
} from 'antd';
import { transactionService } from '../../../services';
import { bankService } from '../../../services/bank.service';
const layout = {
  labelCol: {
    span: 16
  },
  wrapperCol: {
    span: 12
  }
};

const { Option } = Select;

const Comparison = props => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'ID_GiaoDich',
      width: '10%',
      editable: true,
      fixed: 'left'
    },
    {
      title: 'Tài khoản A',
      dataIndex: 'ID_TaiKhoan_TTTK_A',
      width: '15%',
      editable: true
    },
    {
      title: 'Họ tên A',
      dataIndex: 'Username_A',
      width: '20%',
      editable: true
    },
    {
      title: 'Tên ngân hàng A',
      dataIndex: 'TenNganHang_A',
      width: '15%',
      editable: true,
      render: (text, record) => {
        return <Tag color="blue">{record.TenNganHang_A}</Tag>;
      }
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
      width: '20%',
      editable: true
    },
    {
      title: 'Tên ngân hàng B',
      dataIndex: 'TenNganHang_B',
      width: '10%',
      editable: true,
      render: (text, record) => {
        return <Tag color="blue">{record.TenNganHang_B}</Tag>;
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
          case 'DaTra':
            return <Tag color="green">Đã trả</Tag>;
          case 'DangNo':
            return <Tag color="yellow">Đang nợ</Tag>;
          case 'DaNhanTienNo':
            return <Tag color="green">Đã Nhận tiền nợ</Tag>;
        }
      }
    }
  ];

  const [nhGui, setNhGui] = useState('');
  const [nhNhan, setNhNhan] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await transactionService.getAll();
      console.log('DATA=', result);

      if (result && result.success) {
        setData(result.data);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const [bankList, setBankList] = useState([]);
  useEffect(() => {
    async function getBankList() {
      const result = await bankService.getBankList();
      if (result && result.success) {
        setBankList(result.data);
      }
    }
    getBankList();
  }, []);

  const handleChangeSelected = (type, value) => {
    console.log(value);
    if (type === 'Gui') {
      setNhGui(value);
    } else if (type === 'Nhan') {
      setNhNhan(value);
    }
  };

  const fetchDataByQuery = async () => {
    setLoading(true);
    const result = await transactionService.getAll(nhGui, nhNhan);
    console.log('DATA=', result);

    if (result && result.success) {
      setData(result.data);
      setLoading(false);
    }
  };

  const onFinishSearch = values => {
    console.log('Received values from form: ', values);
    fetchDataByQuery();
  };

  return (
    <>
      <Card style={{ width: '100%', marginBottom: 10 }}>
        <Form layout="inline" form={form} onFinish={onFinishSearch}>
          <Form.Item label="Ngân hàng gửi">
            <Select
              onChange={e => handleChangeSelected('Gui', e)}
              placeholder="Chọn ngân hàng"
            >
              <Option value=""></Option>
              {bankList.map(item => {
                return (
                  <Option
                    key={item.ID_NganHangLienKet}
                    value={item.TenNganHang}
                  >
                    {item.TenNganHang}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Ngân hàng nhận">
            <Select
              onChange={e => handleChangeSelected('Nhan', e)}
              placeholder="Chọn ngân hàng"
            >
              <Option value=""></Option>
              {bankList.map(item => {
                return (
                  <Option
                    key={item.ID_NganHangLienKet + item.TenNganHang}
                    value={item.TenNganHang}
                  >
                    {item.TenNganHang}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 2000 }}
        rowKey="ID_GiaoDich"
      />
    </>
  );
};

export default Comparison;
