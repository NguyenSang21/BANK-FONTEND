import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class LoginForm extends Component {

  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

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
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("https://www.vietcombank.com.vn/dangkykhuyenmai/Uploads/images/Banner%201170x616px-01.jpg")',
        backgroundSize: 'cover'
      }}>
        <Form style={{width: 300, textAlign: "center", background: '#1e853e', padding: 10, borderRadius: 5}} onSubmit={this.handleSubmit} className="login-form">
          <h1 style={{color: 'white'}}>Internet Banking</h1>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a style={{color: 'white'}} className="login-form-forgot" href="">
              Forgot password
            </a>
            <div>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </div>
            Or <a style={{color: 'white'}} href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginPage = Form.create({ name: 'normal_login' })(LoginForm);

export default LoginPage;
