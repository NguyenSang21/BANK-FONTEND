import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';

class SettingForm extends Component {

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
        <Form.Item {...formItemLayout} label="Mật khẩu cũ:">
          {getFieldDecorator('oldPassword', {
            rules: [
              {
                required: true,
                message: 'Nhập vào mật khẩu cũ!',
              },
            ],
          })(<Input.Password style={{width: '100%'}} placeholder="Nhập vào mật khẩu cũ!"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Mật khẩu mới:">
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: 'Nhập vào mật khẩu mới!',
              },
            ],
          })(<Input.Password style={{width: '100%'}} placeholder="Nhập vào mật khẩu mới!"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Nhập lại mật khẩu mới:">
          {getFieldDecorator('newPassword2', {
            rules: [
              {
                required: true,
                message: 'Nhập vào mật khẩu mới!',
              },
            ],
          })(<Input.Password style={{width: '100%'}} placeholder="Nhập lại mật khẩu mới!"/>)}
        </Form.Item>
        <Button style={{float: 'right', marginRight: '30%'}} type="primary" htmlType="submit" className="login-form-button">
          Đổi mật khẩu
        </Button>
      </Form>
    );
  }
}

const Setting = Form.create({ name: 'validate_other' })(SettingForm)

export default Setting;
