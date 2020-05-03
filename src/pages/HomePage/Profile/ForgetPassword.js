import React, { useEffect, useState } from 'react';
import { Form, Modal, Spin, Input, notification, message } from 'antd';
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

const DialogNote = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formDataParent, setFormDataParent] = useState([]);
  const [sendOTP, setSendOTP] = useState(false);

  useEffect(() => {
    function resetField() {
      form.resetFields();
    }
    setVisible(props.open);
    setFormDataParent(props.data);
    resetField();
  }, [props.open]);

  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      let values = await form.validateFields();
      console.log(values);
      if (!sendOTP) {
        const sendOTP = await userService.sendOTP(values.username);
        if (sendOTP && sendOTP.success) {
          setSendOTP(true);
          message.success('Gửi OTP thành công!');
        }
      } else {
        const result = await userService.resetPassword(values);

        if (result && result.success) {
          notification.success({
            message: 'Thông báo',
            description: 'Đổi mật khẩu thành công!',
            duration: 5000
          });
          props.handleClose(); // close
        }
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
      title="Thêm ghi chú"
      visible={visible}
      onOk={() => handleSubmit()}
      okText="Đồng ý"
      onCancel={() => props.handleClose()}
      cancelText="Hủy"
    >
      <p style={{ textAlign: 'center' }}>
        Một mã xác thực sẽ được gủi đến mail của bạn
      </p>
      <p style={{ textAlign: 'center' }}>
        Vui lòng làm theo các bước bên dưới:
      </p>
      <Spin spinning={loading}>
        <Form {...layout} form={form} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="username"
            label="Tài khoản:"
            rules={[
              {
                required: true,
                message: 'Nhập vào tài khoản!'
              }
            ]}
          >
            <Input placeholder="Nhập vào tài khoản!" />
          </Form.Item>
          {sendOTP ? (
            <>
              <Form.Item
                name="newPassword"
                label="Mật khẩu mới:"
                rules={[
                  {
                    required: true,
                    message: 'Nhập mật khẩu mới!'
                  }
                ]}
              >
                <Input.Password placeholder="Nhập vào mật khẩu mới!" />
              </Form.Item>
              <Form.Item
                name="OTP"
                label="Ghi chú:"
                rules={[
                  {
                    required: true,
                    message: 'Nhập vào OTP!'
                  }
                ]}
              >
                <Input placeholder="Nhập vào OTP!" />
              </Form.Item>
            </>
          ) : null}
        </Form>
      </Spin>
    </Modal>
  );
};

DialogNote.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(DialogNote);
