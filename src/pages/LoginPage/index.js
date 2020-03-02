import React, { Component, useEffect, useState } from 'react';
import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import { message } from 'antd';
import { fetchData } from '../../helpers';
import { userService } from '../../services';
import { Redirect } from 'react-router-dom';

const LoginForm = (props) => {
  const [isLogin, setLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true)
        const result = await userService.login({
          username: values.username,
          password: values.password
        })

        if (result && result.success) {
          localStorage.setItem('user', JSON.stringify(result))
          setLogin(true)
          message.success("Đăng nhập thành công")
        }

        setLoading(false)
      }
    })
  }

  const { getFieldDecorator } = props.form;
  return (

    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: "url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')",
      backgroundSize: 'cover'
    }}>
      <Spin spinning={loading}>
        <Form
          style={{ width: 300, textAlign: "center", background: '#3b6271', padding: 20, borderRadius: 5 }}
          className="login-form">
          <h1 style={{ color: 'white' }}>Internet Banking</h1>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Vui lòng nhập username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Vui lòng nhập password!' }],
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
            })(<Checkbox style={{ color: 'white' }}>Nhớ mật khẩu</Checkbox>)}
            <div>
              <Button type="primary" onClick={() => handleSubmit()} className="login-form-button">
                Đăng nhập
            </Button>
            </div>
          </Form.Item>
        </Form>
        {
          localStorage.getItem('user') || isLogin ? <Redirect to={{ pathname: '/home' }} /> : null
        }
      </Spin>

    </div>
  )
}

const LoginPage = Form.create({ name: 'normal_login' })(LoginForm);

export default LoginPage
