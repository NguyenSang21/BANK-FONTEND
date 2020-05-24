import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, InputNumber, Spin, Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationActions } from '../../../actions/notification.action';
import { recieverService } from '../../../services/reciever.service';
import { bankService } from '../../../services/bank.service';
const shortid = require('shortid');

const { Option } = Select;

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 14
  }
};

const CreateReciever = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.open);
  }, [props.open]);

  const [bankList, setBankList] = useState([]);
  useEffect(() => {
    async function getBankList() {
      const result = await bankService.getBankList();
      if (result && result.success) {
        setBankList(result.data);
      }
    }
    getBankList();
  }, []);

  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      let values = await form.validateFields();
      const userInfo = JSON.parse(localStorage.getItem('user'));
      values.Username_IN = userInfo.username;
      console.log('Success:', values);
      const result = await recieverService.createReciver(values);
      console.log('Result=:', result);
      if (result && result.success) {
        form.resetFields();
        props.notify_success('Tạo thành công!');
        props.handleClose();
        props.reload();
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
      title="Tạo biệt danh"
      visible={visible}
      onOk={() => handleSubmit()}
      okText="Tạo mới"
      onCancel={() => props.handleClose()}
      cancelText="Hủy"
    >
      <Spin spinning={loading}>
        <Form {...layout} form={form} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="ID_TaiKhoan_TTTK_B_IN"
            label="Số tài khoản:"
            rules={[
              {
                required: true,
                message: 'Nhập vào số tài khoản!'
              }
            ]}
          >
            <Input placeholder="Nhập vào số tài khoản!" />
          </Form.Item>
          <Form.Item
            label="Biệt danh:"
            name="BietDanh_IN"
            rules={[
              {
                required: true,
                message: 'Nhập vào biệt danh!'
              }
            ]}
          >
            <Input placeholder="Nhập vào biệt danh!" />
          </Form.Item>
          <Form.Item
            name="TenNganHang_IN"
            label="Ngân hàng"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn ngân hàng!'
              }
            ]}
            hasFeedback
          >
            <Select placeholder="Vui lòng chọn ngân hàng">
              {bankList.map((item, index) => {
                return (
                  <Option key={index} value={item.TenNganHang}>{item.TenNganHang}</Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

CreateReciever.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(CreateReciever);
