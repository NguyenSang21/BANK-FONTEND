import React, {Component} from 'react';
import {Table, Form, Row, Button, Icon, Col, Card, Input, Radio} from 'antd';

const data = [];

for (let i = 0; i < 5; i++) {
  data.push({
    username: i % 2 === 0 ? 'Nguyễn văn ' + i : 'Nguyễn thị ' + i,
    position: i % 2 === 0 ? 'Nhân viên' : 'Siêu Nhân Viên',
    email: i % 2 === 0 ? `nguyenvan${i}@gmail.com`: `nguyenthi${i}@gmail.com`,
    numberPhone: i % 2 === 0 ? "003-113-456" : "004-115-789",
    address: i % 2 === 0 ? 'TP.HCM' : 'HÀ NỘI',
  });
}

const EditableContext = React.createContext();

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '', selectedOption: 1 };
    this.columns = [
      {
        title: 'Họ tên',
        dataIndex: 'username',
        width: '20%',
        editable: true,
      },
      {
        title: 'Chức danh',
        dataIndex: 'position',
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
          return <Button type="danger" onClick={()=> {console.log(record)}}><Icon type="delete"/>Xóa</Button>
        }
      },
    ];
  }

  onChangeSelectedOption = (e) => {
    this.setState({selectedOption: e.target.value})
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Card style={{width: '100%', marginBottom: 10}}>
            <Row gutter={16}>
              <Col span={8}>
                <Input style={{width: '100%'}} placeholder="Nhập vào thông tin tìm kiếm!"/>
              </Col>
              <Col span={12}>
                <Radio.Group onChange={this.onChangeSelectedOption} value={this.state.selectedOption}>
                  <Radio value={1}>Số tài khoản</Radio>
                  <Radio value={2}>Email</Radio>
                  <Radio value={3}>Số điện thoại</Radio>
                  <Radio value={4}>CMND</Radio>
                </Radio.Group>
                <Button style={{marginLeft: 20}}>Tìm kiếm</Button>
              </Col>
            </Row>
          </Card>
        </Form>
        <EditableContext.Provider value={this.props.form}>
          <Table
            bordered
            dataSource={this.state.data}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel,
            }}
          />
        </EditableContext.Provider>
      </div>
    );
  }
}

const Employee = Form.create({name: 'validate_other'})(EmployeeForm);

export default Employee;
