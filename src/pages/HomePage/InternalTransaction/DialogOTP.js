import React, { useEffect, useState } from 'react'
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
  let idInterval = 0

  useEffect(() => {
    function resetField() {
      form.resetFields()
    }
    setVisible(props.open);
    setFormDataParent(props.data)
    return resetField()
  }, [props.open]);

  useEffect(() => {
    let display = document.querySelector('#count_down')
    console.log(display)
    if(display) {
      idInterval = startTimer(60*5, display)
      console.log(idInterval)
    }

    if(!props.open) {
      clearInterval(idInterval)
    }
  
    return () => {
      console.log("CLEAR =", idInterval)
      clearInterval(idInterval)
    }
  });

  const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    return setInterval(function () {

      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      display.textContent = `Thời gian còn lại: ${minutes} : ${seconds}`;

      if (--timer < 0) {
        clearInterval(idInterval)
      }
    }, 1000);
  }

  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      let values = await form.validateFields();
      formDataParent.OTP_CODE = values.OTP_CODE
      formDataParent.transType = 'Gui'
      console.log(formDataParent)
      const result = await transactionService.internalTrans(formDataParent);

      if (result && result.success) {
        props.notify_success(result.message);
        props.handleClose()
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
    clearInterval(idInterval)
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
        console.log(idInterval)
        clearInterval(idInterval)
        props.handleClose()
      }}
      cancelText="Hủy"
    >
      <p style={{textAlign: "center"}}>Mã xác thực OTP đã được gửi đến email của bạn</p>
      <p id="count_down" style={{textAlign: "center"}}></p>
      <p style={{textAlign: "center"}}>Vui lòng kiểm tra và nhập mã tại đây:</p>
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
  )
}

DialogOTP.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(DialogOTP);

