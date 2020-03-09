import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, InputNumber, Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationActions } from '../../../actions/notification.action';
import { userService } from '../../../services';

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 14
  }
};

const CreateUser = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.open);
  }, [props.open]);

  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      const result = await userService.create(values);
      console.log('Result=:', result);
      if (result && result.success) {
        props.notify_success('Tạo thành công!');
        props.handleClose()
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
    setLoading(false); // end loading
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed: ', errorInfo);
  };

  return (
    <Modal
      maskClosable={false}
      title="Tạo tài khoản mới"
      visible={visible}
      onOk={() => handleSubmit()}
      okText="Tạo mới"
      onCancel={() => props.handleClose()}
      cancelText="Hủy"
    >
      <Spin spinning={loading}>
        <Form {...layout} form={form} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="username"
            label="Tên đăng nhập:"
            rules={[
              {
                required: true,
                message: 'Nhập vào tên đăng nhập!'
              }
            ]}
          >
            <Input placeholder="Nhập vào tên đăng nhập!" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu:"
            rules={[
              {
                required: true,
                message: 'Nhập vào mật khẩu!'
              }
            ]}
          >
            <Input.Password placeholder="Nhập vào mật khẩu!" />
          </Form.Item>
          <Form.Item
            label="Họ và tên:"
            name="name"
            rules={[
              {
                required: true,
                message: 'Nhập vào họ và tên!'
              }
            ]}
          >
            <Input placeholder="Nhập vào họ và tên!" />
          </Form.Item>
          <Form.Item
            name="gmail"
            label="Email:"
            rules={[
              {
                required: true,
                message: 'Nhập vào email!'
              }
            ]}
          >
            <Input placeholder="Nhập vào mail!" />
          </Form.Item>
          <Form.Item
            name="sdt"
            label="Số điện thoại:"
            rules={[
              {
                required: true,
                message: 'Nhập vào số điện thoại!'
              }
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Nhập vào số điện thoại!"
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

CreateUser.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(CreateUser);
