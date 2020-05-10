import React, { Component, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { message } from 'antd';
import { userService } from '../../services';
import { Redirect } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import ReCAPTCHA from 'react-google-recaptcha';
import ForgetPassword from '../HomePage/Profile/ForgetPassword';
const recaptchaRef = React.createRef();

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
    offset: 6,
    span: 18
  }
};

const LoginPage = props => {
  const [form] = Form.useForm();
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState([]);

  const onFinish = async values => {
    setLoading(true)
    const recaptchaValue = recaptchaRef.current.getValue();
    if(!recaptchaValue) {
      message.error("Vui lòng check vào xác thực CAPTCHA")
      setLoading(false)
      return
    }
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

  const grecaptchaObject = (window.recaptchaOptions = {
    useRecaptchaNet: true
  });

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChangeReCap = (value)  => {
    console.log(value)
  }

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
            background: '#20676b',
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
          <Form.Item>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LcWfO4UAAAAAMskAeoaxNmajmXCVKe7ehWHGtKI"
              onChange={(e) => onChangeReCap(e)}
              grecaptcha={grecaptchaObject}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <span>
              <a
                style={{ marginRight: 5 }}
                href="#"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Quên mật khẩu ?
              </a>
            </span>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        {localStorage.getItem('user') || isLogin ? (
          <Redirect to={{ pathname: '/home' }} />
        ) : null}
      </Spin>
      <ForgetPassword
        key={Math.random(1, 9999999)}
        open={openModal}
        data={formData}
        handleClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default LoginPage;
