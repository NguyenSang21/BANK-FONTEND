import React, { useEffect, useState } from 'react';
import { Form, Modal, Spin, Input, notification } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationActions } from '../../../actions/notification.action';
import { debtService } from '../../../services';

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
      values.Username_IN = formDataParent.Username_IN;
      console.log(values);

      const result = await debtService.removeDebt(
        formDataParent.ID_GiaoDich,
        values
      );

      if (result && result.success) {
        notification.success({
          message: 'Thông báo',
          description: 'Hủy nhắc thành công!'
        });
      }

      props.handleClose(); // close
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
      <p style={{ textAlign: 'center' }}>Thêm vào ghi chú của bạn phía dưới:</p>
      <Spin spinning={loading}>
        <Form {...layout} form={form} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="GhiChu_IN"
            label="Ghi chú:"
            rules={[
              {
                required: true,
                message: 'Nhập vào ghi chú!'
              }
            ]}
          >
            <Input placeholder="Nhập vào ghi chú!" />
          </Form.Item>
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
