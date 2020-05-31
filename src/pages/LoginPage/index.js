import React, { Component, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Spin, Layout, Menu, Breadcrumb } from 'antd';
import { message } from 'antd';
import { userService } from '../../services';
import { Redirect } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import ReCAPTCHA from 'react-google-recaptcha';
import ForgetPassword from '../HomePage/Profile/ForgetPassword';

const { Header, Content, Footer } = Layout;

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
    <Layout className="layout">
    <Header style={{background: '#f0b046'}}>
      <div className="logo">
            <p
              style={{
                lineHeight: '30px',
                fontSize: 14,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center'
              }}
            >
              I@Banking BBC
            </p>
          </div>
      <Menu  theme="light"
            mode="horizontal"
            style={{
              lineHeight: '64px',
              background: '#f0b046',
              color: 'white'
            }}>
      <Menu.Item key="1">Tiết kiệm trực tuyến</Menu.Item>
      <Menu.Item key="2">Tiện ích gia tăng</Menu.Item>
      <Menu.Item key="3">Hỗ trợ giao dịch</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: 0, height: 835 }}>
      <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        paddingLeft: '1490px',
        alignItems: 'center',
        backgroundImage:
          "url('https://www.msb.com.vn:8080/razuna/assets/1/CECEFCF63C70477CAA12F13B9CEFDE28/img/D54324C7D3DB4CEA9F2871748E0D28B2/MBusiness_TopbannerWeb_2500x1080px.jpg')",
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
            background: '#f06725',
            padding: 20,
            borderRadius: 5
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="login-form"
        >
          <h1 style={{ color: 'white' }}>Internet Banking BBC</h1>
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
    </Content>
    <Footer style={{ textAlign: 'center', background: '#f0b046'}}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
};

export default LoginPage;
