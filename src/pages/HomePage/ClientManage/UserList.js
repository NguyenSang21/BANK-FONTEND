import React, { useState } from 'react';
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
} from 'antd';
import CreateUser from "./CreateUser";

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    accountNumber: 23465777778 + i,
    username: i % 2 === 0 ? 'Nguyễn văn ' + i : 'Nguyễn thị ' + i,
    email: i % 2 === 0 ? `nguyenvan${i}@gmail.com` : `nguyenthi${i}@gmail.com`,
    numberPhone: i % 2 === 0 ? "003-113-456" : "004-115-789",
    address: i % 2 === 0 ? 'TP.HCM' : 'HÀ NỘI',
  });
}

const EditableContext = React.createContext();

function UserListForm(props) {
  const [openModal, setOpenModal] = useState(false)

  const columns = [
    {
      title: 'Số tài khoản (Thanh Toán)',
      dataIndex: 'accountNumber',
      width: '20%',
      editable: true,
    },
    {
      title: 'Họ tên',
      dataIndex: 'username',
      width: '20%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
      editable: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberPhone',
      width: '20%',
      editable: true,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: '20%',
      editable: true,
    },
    {
      title: 'Action 1',
      dataIndex: 'detail',
      width: '20%',
      editable: true,
      render: (text, record) => {
        return <Button onClick={() => { console.log(record) }}><Icon type="eye" />Lịch sử GD</Button>
      }
    },
    {
      title: 'Action 2',
      dataIndex: 'napTien',
      width: '20%',
      editable: true,
      render: (text, record) => {
        return <Button type="primary" onClick={() => { console.log(record) }}><Icon type="download" />Nạp Tiền</Button>
      }
    }];

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <div>
      <Form {...formItemLayout}>
        <Card style={{ width: '100%', marginBottom: 10 }}>
          <Row gutter={16}>
            <Col span={3}>
              <Button ghost type="primary" onClick={() => setOpenModal(true)}>
                <Icon type="plus-circle" />
                Tạo mới
              </Button>
            </Col>
            <Col span={8}>
              <Input style={{ width: '100%' }} placeholder="Nhập vào thông tin tìm kiếm!" />
            </Col>
            <Col span={12}>
              <Radio.Group onChange={() => { console.log('test') }} value={1}>
                <Radio value={1}>Số tài khoản</Radio>
                <Radio value={2}>Email</Radio>
                <Radio value={3}>Số điện thoại</Radio>
                <Radio value={4}>CMND</Radio>
              </Radio.Group>
              <Button style={{ marginLeft: 20 }}>Tìm kiếm</Button>
            </Col>
          </Row>
        </Card>
      </Form>
      <EditableContext.Provider value={props.form}>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: () => { console.log('aaaa') },
          }}
        />
      </EditableContext.Provider>
      <CreateUser
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </div>
  )
}

const UserList = Form.create({ name: 'validate_other' })(UserListForm);

export default UserList;