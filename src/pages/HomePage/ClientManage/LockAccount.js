import React, { useEffect, useState } from 'react';
import { Form, Modal, InputNumber, Spin, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationActions } from '../../../actions/notification.action';
import {
  transactionService,
  userService,
  employeeService
} from '../../../services';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 14
  }
};

const LockAccount = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (props.data && props.data.Username) {
        const result = await userService.getAccountByType(
          props.data.Username,
          'all'
        );
        if (result && result.success) {
          setAccountList(result.data);
        }
      }
      setVisible(props.open);
    }
    fetchData();
  }, [props.data]);

  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      let values = await form.validateFields();
      console.log(values);
      const result = await employeeService.lock(values.accountNumberB);

      if (result && result.success) {
        props.notify_success(result.message);
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
      title="LockAccount"
      visible={visible}
      onOk={() => handleSubmit()}
      okText="Đồng ý"
      onCancel={() => props.handleClose()}
      cancelText="Hủy"
    >
      <p style={{ textAlign: 'center' }}>
        Điền thông tin của khách hàng mà bạn muốn nạp:
      </p>
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
            <Select placeholder="Chọn số tài khoản">
              {accountList.map(item => {
                return (
                  <Option
                    key={item.ID_TaiKhoanTTTK}
                    value={item.ID_TaiKhoanTTTK}
                  >{`${item.ID_TaiKhoanTTTK} (${
                    item.Loai === 'TT' ? 'Thanh toán' : 'Tiết kiệm'
                  })`}</Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

LockAccount.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  reload: PropTypes.func
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(LockAccount);
