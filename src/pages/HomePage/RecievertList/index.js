import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Button, Col, Card, Tag, message, Modal } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import { recieverService } from '../../../services/reciever.service';
import CreateReciever from './CreateReciever';
import UpdateReciever from './UpdateReciever';
import shortid from 'shortid';
const { confirm } = Modal;

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
  const [updateData, setUpdateData] = useState([]);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

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
    },
    {
      title: 'Action 1',
      dataIndex: 'action',
      width: '15%',
      editable: true,
      render: (text, record) => {
        return (
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Sửa đổi
          </Button>
        );
      }
    },
    {
      title: 'Action 2',
      dataIndex: 'action',
      width: '15%',
      editable: true,
      render: (text, record) => {
        return (
          <Button type="danger" onClick={() => showDeleteConfirm(record)}>
            <DeleteOutlined />
            Xóa
          </Button>
        );
      }
    }
  ];

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      initData();
    }

    fetchData();
  }, [reload]);

  const initData = async () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setLoading(true);
    const result = await recieverService.getReciverList(userInfo.username);
    console.log('DATA=', result);
    if (result && result.success) {
      setData(result.data);
      setLoading(false);
    }
  };

  const handleUpdate = record => {
    console.log(record);
    setOpenModalUpdate(true);
    setUpdateData(record);
  };

  const handleDelete = async record => {
    console.log(record)
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const result = await recieverService.deleteReciver(userInfo.username, record)
    
    if (result && result.success) {
      message.success('Xóa thành công!')
      setLoading(false)
      await initData()
    }
  }

  function showDeleteConfirm(record) {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      icon: <ExclamationCircleOutlined />,
      content: 'Nhấn "Yes" để hoàn thành thao tác',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
      setLoading(true);
       handleDelete(record)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

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
        rowKey={shortid}
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
        reload={() => initData()}
      />
      <UpdateReciever
        data={updateData}
        open={openModalUpdate}
        handleClose={() => setOpenModalUpdate(false)}
        reload={() => initData()}
      />
    </>
  );
};

export default RecieverList;
