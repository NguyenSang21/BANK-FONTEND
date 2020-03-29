import React, { Component, useState, useEffect } from 'react';
import { Table, Form, Row, Button, Icon, Col, Card, Input, Radio } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { employeeService } from '../../../services';

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const Employee = props => {
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'HoTen',
      width: '20%',
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
      width: '20%',
      editable: true
    },
    {
      title: 'Action 1',
      dataIndex: 'detail',
      width: '20%',
      editable: true,
      render: (text, record) => {
        return (
          <Button
            type="danger"
            onClick={() => {
              console.log(record);
            }}
          >
            <DeleteOutlined />
            Xóa
          </Button>
        );
      }
    }
  ];

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData () {
      setLoading(true)
      const result = await employeeService.getAll()
      
      if(result && result.success) {
        setData(result.data)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Form {...layout} form={form}>
        <Card style={{ width: '100%', marginBottom: 10 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Input
                style={{ width: '100%' }}
                placeholder="Nhập vào thông tin tìm kiếm!"
              />
            </Col>
            <Col span={12}>
              <Radio.Group
                onChange={() => { }}
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
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: () => {}
        }}
      />
    </>
  )
}

export default Employee;
