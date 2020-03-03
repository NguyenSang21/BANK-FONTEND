import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Modal,
  InputNumber,
} from 'antd';
import PropTypes from 'prop-types'
import { userService } from '../../../services';
import { connect } from 'react-redux'
import { notificationActions } from '../../../actions/notification.action';

function CreateUserForm(props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(props.open)
  }, [props.open])

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields( async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const result = await userService.create(values)

        if(result && result.success) {
          props.notify_success("Tạo thành công!")
          setVisible(false)
        }

      }
    });
  };

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Modal
      maskClosable={false}
      title="Tạo tài khoản mới"
      visible={visible}
      onOk={(e) => handleSubmit(e)}
      okText="Tạo mới"
      onCancel={() => setVisible(false)}
      cancelText="Hủy"
    >
      <Form {...formItemLayout}>
        <Form.Item {...formItemLayout} label="Tên đăng nhập:">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Nhập vào tên đăng nhập!',
              },
            ],
          })(<Input placeholder="Nhập vào tên đăng nhập!" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Mật khẩu:">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Nhập vào mật khẩu!',
              },
            ],
          })(<Input.Password placeholder="Nhập vào mật khẩu!" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Họ và tên:">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Nhập vào họ và tên!',
              },
            ],
          })(<Input placeholder="Nhập vào họ và tên!" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Email:">
          {getFieldDecorator('gmail', {
            rules: [
              {
                required: true,
                message: 'Nhập vào email!',
              },
            ],
          })(<Input placeholder="Nhập vào mail!" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Số điện thoại:">
          {getFieldDecorator('sdt', {
            rules: [
              {
                required: true,
                message: 'Nhập vào số điện thoại!',
              },
            ],
          })(<InputNumber style={{width: '100%'}} placeholder="Nhập vào số điện thoại!" />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CreateUser = Form.create({ name: 'create_user' })(CreateUserForm)

CreateUser.propTypes = {
  open: PropTypes.bool,
}

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
}

export default connect(null, actionCreators)(CreateUser);
