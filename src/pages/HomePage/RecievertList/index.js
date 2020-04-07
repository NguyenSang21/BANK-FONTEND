import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Button, Col, Card, Input, Radio, Tag } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { recieverService } from '../../../services/reciever.service';
import CreateReciever from './CreateReciever';

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const RecieverList = props => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'ID_TaiKhoan_TTTK_B',
      width: '20%',
      editable: true
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'TenNganHang',
      width: '20%',
      editable: true
    },
    {
      title: 'Biệt danh',
      dataIndex: 'BietDanh',
      width: '20%',
      editable: true,
      render: (text, record) => {
        return <Tag color="green">{record.BietDanh}</Tag>;
      }
    }
  ];

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const result = await recieverService.getReciverList(userInfo.username);
      console.log('DATA=', result);
      if (result && result.success) {
        setData(result.data);
        setLoading(false);
      }
    }

    fetchData();
  }, [reload]);

  return (
    <>
      <Form {...layout} form={form}>
        <Card style={{ width: '100%', marginBottom: 10 }}>
          <Row gutter={16}>
            <Col span={3}>
              <Button ghost type="primary" onClick={() => setOpenModal(true)}>
                <PlusCircleOutlined />
                Thêm biệt danh
              </Button>
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
          onChange: () => {
            console.log('aaaa');
          }
        }}
      />
      <CreateReciever
        open={openModal}
        handleClose={() => setOpenModal(false)}
        reload={() => setReload(true)}
      />
    </>
  );
};

export default RecieverList;
