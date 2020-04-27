import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Button, Col, Card, Input, Radio, Tag } from 'antd';
import CreateUser from './CreateUser';
import {
  PlusCircleOutlined,
  EyeOutlined,
  DownOutlined
} from '@ant-design/icons';
import { userService } from '../../../services';
import History from './History'
import Topup from './Topup';

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const UserList = props => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openModalHistory, setOpenModalHistory] = useState(false);
  const [formDataHistory, setFormDataHistory] = useState([]);
  const [openModalTopup, setOpenModalTopup] = useState(false);
  const [formDataTopup, setFormDataTopup] = useState([]);

  const columns = [
    {
      title: 'Mã KH',
      dataIndex: 'ID_TaiKhoan',
      width: '10%',
      fixed: 'left',
      editable: true,
      render: (text, record) => {
        return <Tag color="blue">{record.ID_TaiKhoan}</Tag>
      }
    },
    {
      title: 'Username',
      dataIndex: 'Username',
      width: '20%',
      editable: true
    },
    {
      title: 'Họ tên',
      dataIndex: 'HoTen',
      width: '15%',
      editable: true
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      width: '20%',
      editable: true
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'DienThoai',
      width: '15%',
      editable: true
    },
    {
      title: 'Tình trạng',
      dataIndex: 'TinhTrang',
      width: '15%',
      editable: true,
      render: (text, record) => {
        switch (record.TinhTrang) {
          case 'KichThoat':
            return <Tag color="green">Đã kích hoạt</Tag>;
          default:
            return <Tag color="yellow">null</Tag>;
        }
      }
    },
    {
      title: 'Số lượng TK(Thanh toán)',
      dataIndex: 'SLTKGiaoDich',
      width: '13%',
      editable: true
    },
    {
      title: 'Số lượng TK(Tiết kiệm)',
      dataIndex: 'SLTKTietKiem',
      width: '13%',
      editable: true
    },
    {
      title: 'Tổng tiền(Thanh toán)',
      dataIndex: 'TongTienTT',
      width: '13%',
      editable: true
    },
    {
      title: 'Tổng tiền(Tiết kiệm)',
      dataIndex: 'TongTienTK',
      width: '13%',
      editable: true,
      render: (text, record) => {
        if (record.TongTienTK === null)
          return <>0</>
        else
          return <>{record.TongTienTK}</>
      }
    },
    {
      title: 'Số lượng GD(Gủi)',
      dataIndex: 'SLGui',
      width: '13%',
      editable: true
    },
    {
      title: 'Số lượng GD(Nhận)',
      dataIndex: 'SLNhan',
      width: '13%',
      editable: true
    },
    {
      title: 'Số lượng nợ',
      dataIndex: 'SLNo',
      width: '13%',
      editable: true
    },
    {
      title: 'Số lượng trả nợ',
      dataIndex: 'SLTraNo',
      width: '13%',
      editable: true
    },
    {
      title: 'Action 1',
      dataIndex: 'detail',
      width: '15%',
      editable: true,
      render: (text, record) => {
        return (
          <Button
            onClick={() => handleViewHistory(record)}
          >
            <EyeOutlined />
            Lịch sử GD
          </Button>
        );
      }
    },
    {
      title: 'Action 2',
      dataIndex: 'napTien',
      width: '15%',
      editable: true,
      render: (text, record) => {
        return (
          <Button
            type="primary"
            onClick={() => handleTopup(record)}
          >
            <DownOutlined />
            Nạp Tiền
          </Button>
        );
      }
    }
  ];

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      initData()
    }

    fetchData();
  }, []);

  const initData = async () => {
    setLoading(true)
    const result = await userService.getListClient();
    console.log('DATA=', result);
    if (result && result.success) {
      setData(result.data);
      setLoading(false);
    }
  }

  const handleViewHistory = (record) => {
    console.log(record)
    setFormDataHistory(record)
    setOpenModalHistory(true)
  }

  const handleTopup = (record) => {
    console.log(record)
    setOpenModalTopup(true)
    setFormDataTopup(record)
  }

  return (
    <div>
      <Form {...layout} form={form}>
        <Card style={{ width: '100%', marginBottom: 10 }}>
          <Row gutter={16}>
            <Col span={3}>
              <Button ghost type="primary" onClick={() => setOpenModal(true)}>
                <PlusCircleOutlined />
                Tạo mới
              </Button>
            </Col>
            <Col span={8}>
              <Input
                style={{ width: '100%' }}
                placeholder="Nhập vào thông tin tìm kiếm!"
              />
            </Col>
            <Col span={12}>
              <Radio.Group
                onChange={() => {
                  console.log('test');
                }}
                value={1}
              >
                <Radio value={1}>Số tài khoản</Radio>
                <Radio value={2}>Email</Radio>
                <Radio value={3}>Số điện thoại</Radio>
              </Radio.Group>
              <Button style={{ marginLeft: 20 }}>Tìm kiếm</Button>
            </Col>
          </Row>
        </Card>
      </Form>
      <Table
        loading={isLoading}
        bordered
        scroll={{ x: 2500 }}
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: () => {
            console.log('aaaa');
          }
        }}
      />
      <CreateUser open={openModal} handleClose={() => setOpenModal(false)} />
      <History key={Math.random(0, 99999999)} data={formDataHistory} open={openModalHistory} handleClose={() => setOpenModalHistory(false)} />
      <Topup reload={() => initData()} key={Math.random(0, 99999999)} data={formDataTopup} open={openModalTopup} handleClose={() => setOpenModalTopup(false)} />
    </div>
  );
};

export default UserList;
