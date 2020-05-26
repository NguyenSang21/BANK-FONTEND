import React, { Component, useState, useEffect } from 'react';
import {
  Form,
  Select,
  Card,
  Input,
  InputNumber,
  Button,
  Col,
  Row,
  Spin,
  AutoComplete
} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { userService, debtService, clientService } from '../../../services';
import { notificationActions } from '../../../actions/notification.action';
import { connect } from 'react-redux';
import { recieverService } from '../../../services/reciever.service';

const { TextArea } = Input;
const { Search } = Input;

const SettingDebt = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [stk, setSTK] = useState(0);

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
  };

  const formItemLayout2 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 }
  };

  const [options, setOptions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const result = await recieverService.getReciverList(userInfo.username);

      if (result && result.success) {
        const temp = [];
        result.data.map(item => {
          temp.push({
            label: item.BietDanh,
            value: item.ID_TaiKhoan_TTTK_B + '',
            key: Math.random(0, 999999)
          });
        });
        setOptions(temp);
      }
    }
    fetchData();
  }, []);

  const onFinish = async values => {
    setLoading(true);
    const userDetail = JSON.parse(localStorage.getItem('user'));
    const result = await userService.getAccountByType(
      userDetail.username,
      'TT'
    );

    if (result && result.success) {
      values.accountNumberA = result.data[0].ID_TaiKhoanTTTK;
      values.username = userInfo.Username;
      values.payer = 'B';

      const result_2 = await debtService.create(values);

      if (result_2 && result_2.success) {
        props.notify_success(result_2.message);
      }
    }
    setLoading(false);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const checkUserInfo = async () => {
    console.log(form.getFieldValue('accountNumberB'));
    const id = form.getFieldValue('accountNumberB');
    const result = await clientService.getInfoByTK(id);

    if (result && result.success) {
      let data = result.data[0];

      data.accountNumber = id;
      setUserInfo(data);
    }
  };

  const handleChangeAutoComplete = async e => {
    if (e) {
      setSTK(e)
      form.setFieldsValue({accountNumberB: e})
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
        form={form}
      >
        <Card
          extra={<SettingOutlined />}
          headStyle={{ background: '#fafafa' }}
          title="Tạo nhắc nợ"
          style={{ width: '100%' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Row>
                <Col span={18}>
                  <Form.Item
                    name="accountNumberB"
                    rules={[
                      {
                        required: true,
                        message: 'Nhập số tài khoản người nợ!'
                      }
                    ]}
                    {...formItemLayout2}
                    label="Số tài khoản:"
                  >
                    <AutoComplete
                      onChange={e => handleChangeAutoComplete(e)}
                      placeholder="Nhập vào STK hoặc chọn người nhận!"
                      options={options}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Button
                    type="primary"
                    onClick={() => checkUserInfo()}
                  >Kiểm tra</Button>
                </Col>
                </Row>
                <Form.Item
                  name="amount"
                  {...formItemLayout}
                  rules={[
                    {
                      required: true,
                      message: 'Nhập số tiền nợ cần trả!'
                    }
                  ]}
                  label="Số tiền nợ:"
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={20000000}
                    placeholder="Nhập số tiền nợ cần trả!"
                  />
                </Form.Item>
                <Form.Item
                  name="note"
                  label="Nội dung:"
                  rules={[
                    { required: true, message: 'Vui lòng nhập nội dung!' }
                  ]}
                  hasFeedback
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Thông tin tài khoản (Nợ)">
                <div>
                  <label>Số tài khoản:</label>
                  &nbsp;
                  <span>
                    {(userInfo.length !== 0 && userInfo.accountNumber) || '...'}
                  </span>
                </div>
                <br />
                <div>
                  <label>Chủ tài khoản:</label>
                  &nbsp;
                  <span>
                    {(userInfo.length !== 0 && userInfo.Username) || '...'}
                  </span>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
              </Card>
            </Col>
          </Row>
          <Button
            style={{ float: 'right', marginRight: '5%', marginTop: '2%' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Gủi nhắc nợ
          </Button>
        </Card>
      </Form>
    </Spin>
  );
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(SettingDebt);
