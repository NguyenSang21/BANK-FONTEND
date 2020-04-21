import React, { useEffect, useState } from 'react';
import { Table, Form, Row, Button, Icon, Col, Card, Input, Radio,Tag } from 'antd';
import { transactionService } from '../../../services';
const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const Comparison = props => {
  const [form] = Form.useForm()
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
            return <Tag color="yellow">Đang đòi</Tag>;
        }
      }
    }
  ];

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

  return (
    <>
      <Form {...layout} form={form}>
        <Card style={{ width: '100%', marginBottom: 10 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Radio.Group onChange={() => { }} value={1}>
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
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500 }}
      />
    </>
  );
};

export default Comparison;
