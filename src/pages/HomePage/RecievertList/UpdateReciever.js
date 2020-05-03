import React, { useEffect, useState } from 'react';
import { Form, Modal, Spin, Input, notification } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationActions } from '../../../actions/notification.action';
import { debtService } from '../../../services';
import { recieverService } from '../../../services/reciever.service';

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 14
  }
};

const UpdateReciever = props => {
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
    form.setFieldsValue({ BietDanh_IN: props.data.BietDanh });
  }, [props.open]);

  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      let values = await form.validateFields();
      console.log(values);

      const data = {
        BietDanh_IN: values.BietDanh_IN,
        ID_TaiKhoan_TTTK_B_IN: formDataParent.ID_TaiKhoan_TTTK_B,
        TenNganHang_IN: formDataParent.TenNganHang
      };
      const result = await recieverService.updateReciver(
        userInfo.username,
        data
      );

      if (result && result.success) {
        notification.success({
          message: 'Thông báo',
          description: 'Sửa biệt danh thành công!'
        });
      }

      props.handleClose();
      props.reload();

      // props.handleClose() // close
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
      title="Sửa biệt danh"
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
            name="BietDanh_IN"
            label="Biệt danh:"
            rules={[
              {
                required: true,
                message: 'Nhập vào biệt danh!'
              }
            ]}
          >
            <Input placeholder="Nhập vào biệt danh!" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

UpdateReciever.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  reload: PropTypes.func
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(UpdateReciever);
