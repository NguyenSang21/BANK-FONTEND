import React, { useEffect, useState } from 'react';
import { Form, Modal, InputNumber, Spin, Input } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationActions } from '../../../actions/notification.action';
import { transactionService } from '../../../services';

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 14
  }
};

const DialogOTP = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formDataParent, setFormDataParent] = useState([]);
  let idInterval = 0;

  useEffect(() => {
    setVisible(props.open);
    setFormDataParent(props.data);
  }, [props.open]);



  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      let values = await form.validateFields();
      formDataParent.OTP_CODE = values.OTP_CODE;
      formDataParent.transType = 'Gui';

      const result = await transactionService.internalTrans(formDataParent);

      if (result && result.success) {
        props.notify_success(result.message);
        props.handleClose();
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
    clearInterval(idInterval);
    setLoading(false); // end loading
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed: ', errorInfo);
  };

  return (
    <Modal
      maskClosable={false}
      title="Xác thực OTP"
      visible={visible}
      onOk={() => handleSubmit()}
      okText="Nhập mã"
      onCancel={() => {
        console.log(idInterval);
        clearInterval(idInterval);
        props.handleClose();
      }}
      cancelText="Hủy"
    >
      <p style={{ textAlign: 'center' }}>
        Mã xác thực OTP đã được gửi đến email của bạn
      </p>
      {/* <p id="count_down" style={{ textAlign: 'center' }}></p> */}
      <p style={{ textAlign: 'center' }}>
        Vui lòng kiểm tra và nhập mã tại đây:
      </p>
      <Spin spinning={loading}>
        <Form {...layout} form={form} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="OTP_CODE"
            label="Mã OTP:"
            rules={[
              {
                required: true,
                message: 'Nhập vào mã OTP!'
              }
            ]}
          >
            <Input placeholder="Nhập vào mã OTP!" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

DialogOTP.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(DialogOTP);
