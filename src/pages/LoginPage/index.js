import React, { Component, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { message } from 'antd';
import { userService } from '../../services';
import { Redirect } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const LoginPage = props => {
  const [form] = Form.useForm();
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    setLoading(true);
    const result = await userService.login({
      username: values.username,
      password: values.password
    });

    if (result && result.success) {
      localStorage.setItem('user', JSON.stringify(result));
      setLogin(true);
      message.success('Đăng nhập thành công');
    }

    setLoading(false);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage:
          "url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')",
        backgroundSize: 'cover'
      }}
    >
      <Spin spinning={loading}>
        <Form
          {...layout}
          form={form}
          style={{
            width: 350,
            textAlign: 'center',
            background: '#3b6271',
            padding: 20,
            borderRadius: 5
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="login-form"
        >
          <h1 style={{ color: 'white' }}>Internet Banking</h1>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập vào username!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout} valuePropName="checked">
            <Checkbox style={{ color: 'white' }}>Nhớ mật khẩu</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        {localStorage.getItem('user') || isLogin ? (
          <Redirect to={{ pathname: '/home' }} />
        ) : null}
      </Spin>
    </div>
  );
};

export default LoginPage;
