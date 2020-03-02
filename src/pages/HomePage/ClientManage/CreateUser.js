import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';

class CreateUserForm extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Tên đăng nhập:">
          {getFieldDecorator('loginName', {
            rules: [
              {
                required: true,
                message: 'Nhập vào tên đăng nhập!',
              },
            ],
          })(<Input style={{width: '100%'}} placeholder="Nhập vào tên đăng nhập!"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Nhập vào mật khẩu:">
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: 'Nhập vào mật khẩu!',
              },
            ],
          })(<Input.Password style={{width: '100%'}} placeholder="Nhập vào mật khẩu!"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Họ và tên:">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Nhập vào họ và tên!',
              },
            ],
          })(<Input style={{width: '100%'}} placeholder="Nhập vào họ và tên!"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Email:">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Nhập vào email!',
              },
            ],
          })(<Input style={{width: '100%'}} placeholder="Nhập vào mail!"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Số điện thoại:">
          {getFieldDecorator('numberPhone', {
            rules: [
              {
                required: true,
                message: 'Nhập vào số điện thoại!',
              },
            ],
          })(<Input style={{width: '100%'}} placeholder="Nhập vào số điện thoại!"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Địa chỉ:">
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: 'Nhập vào địa chỉ!',
              },
            ],
          })(<Input style={{width: '100%'}} placeholder="Nhập vào địa chỉ!"/>)}
        </Form.Item>
        <Button style={{float: 'right', marginRight: '10%'}} type="primary" htmlType="submit" className="login-form-button">
          Tạo tài khoản
        </Button>
      </Form>
    );
  }
}

const CreateUser = Form.create({ name: 'validate_other' })(CreateUserForm)

export default CreateUser;
