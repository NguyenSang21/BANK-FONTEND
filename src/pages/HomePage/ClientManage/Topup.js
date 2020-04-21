import React, { useEffect, useState } from 'react'
import { Form, Modal, InputNumber, Spin, Input } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationActions } from '../../../actions/notification.action';
import { transactionService, userService, employeeService } from '../../../services';

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 14
  }
};

const Topup = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
      async function fetchData(){
        if(props.data && props.data.Username) {
          const result = await userService.getAccountByType(props.data.Username, 'TT')
          form.setFieldsValue({accountNumberB: result.data.length !== 0 && result.data[0].ID_TaiKhoanTTTK})
        }
       setVisible(props.open);
      }
      fetchData()
  }, [props.data]);

  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      let values = await form.validateFields();
      console.log(values)
      const result = await employeeService.topup(values);

      if (result && result.success) {
        props.notify_success(result.message);
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
      title="Topup"
      visible={visible}
      onOk={() => handleSubmit()}
      okText="Đồng ý"
      onCancel={() => props.handleClose()}
      cancelText="Hủy"
    >
      <p style={{textAlign: "center"}}>Điền thông tin của khách hàng mà bạn muốn nạp:</p>
      <Spin spinning={loading}>
        <Form {...layout} form={form} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="accountNumberB"
            label="Số tài khoản:"
            rules={[
              {
                required: true,
                message: 'Nhập vào số tài khoản!'
              }
            ]}
          >
            <Input disabled placeholder="Nhập vào số tài khoản!" />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Số tiền:"
            rules={[
              {
                required: true,
                message: 'Nhập vào số tiền!'
              }
            ]}
          >
            <Input placeholder="Nhập vào số tiền!" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

Topup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(Topup);

