import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { userService } from '../../../services';
import { message } from 'antd';
import { connect } from 'react-redux';
import { notificationActions } from '../../../actions/notification.action';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 14
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 14
    },
    sm: {
      span: 6
    }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 24,
      offset: 8
    }
  }
};

const Setting = props => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const onFinish = async values => {
    setLoading(true); // start loading
    console.log(
      'Received values of form: ',
      JSON.parse(localStorage.getItem('user'))
    );
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const result = await userService.changePass({
      username: userInfo.username,
      password: values.newPassword,
      oldPassword: values.oldPassword,
    });

    if (result && result.success) {
      props.notify_success(result.message);
    }

    setLoading(false); // end loading
  };

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86'
        }}
        scrollToFirstError
      >
        <Form.Item
          name="oldPassword"
          label="Mật khẩu cũ"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu cũ!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu mới!'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập xác nhận lại mật khẩu!'
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('Vui lòng nhập vào chính xác password!');
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(Setting);
