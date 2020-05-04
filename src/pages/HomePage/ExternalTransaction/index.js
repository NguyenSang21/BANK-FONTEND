import React, { useState, useEffect } from 'react';
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
import { userService, transactionService, clientService } from '../../../services';
import { bankService } from '../../../services/bank.service';
import DialogOTP from './DialogOTP';
import { recieverService } from '../../../services/reciever.service';

const { Option } = Select;
const { TextArea } = Input;

const ExternalTransaction = props => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      const userDetail = JSON.parse(localStorage.getItem('user'));
      const result = await userService.getAccountByType(
        userDetail.username,
        'TT'
      );

      if (result && result.success) {
        setUserInfo(result.data[0]);
      }
    }

    getUserInfo();
  }, []);

  const [bankList, setBankList] = useState([]);
  const [options, setOptions] = useState([])
  useEffect(() => {
    async function getBietDanh() {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const result = await recieverService.getReciverList(userInfo.username);
      console.log('DATA=', result);
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
    getBietDanh();
    async function getBankList() {
      const result = await bankService.getBankList();
      if (result && result.success) {
        setBankList(result.data);
      }
    }
    getBankList();
  }, []);

  const onFinish = async values => {
    setLoading(true);

    const userDetail = JSON.parse(localStorage.getItem('user'));
    values.accountNumberA = userInfo.ID_TaiKhoanTTTK;
    values.username = userDetail.username;

    const result = await transactionService.getOTP(userDetail.username);

    if (result && result.success) {
      setFormData(values);
      setOpenModal(true);
      setLoading(false);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeAutoComplete = async e => {
    if (e) {
      const userInfo = await getUserByAcountNumber(e);
      console.log("USERNAME==", userInfo.username)
      form.setFieldsValue({ nameB: userInfo.HoTen })
      form.setFieldsValue({ bankNameB: userInfo.TenNganHang})
    }
  };

  const getUserByAcountNumber = async id => {
    const result = await clientService.getInfoByTK(id);
    if (result && result.success) {
      return result.data[0] || '';
    }
    return {};
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <Spin spinning={loading}>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Card
              headStyle={{ background: '#fafafa' }}
              title="THÔNG TIN NGƯỜI CHUYỂN"
              style={{ width: '100%' }}
            >
              <div>
                <label>Tài khoản nguồn:</label>
                &nbsp;
                <span>{userInfo && userInfo.ID_TaiKhoanTTTK}</span>
              </div>
              <br />
              <div>
                <label>Số dư khả dụng:</label>
                &nbsp;
                <span>{userInfo && userInfo.SoDu} VNĐ</span>
              </div>
              <br />
              <br />
              <br />
              <br />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              headStyle={{ background: '#fafafa' }}
              title="THÔNG TIN NGƯỜI HƯỞNG"
              style={{ width: '100%' }}
            >
              <Form.Item
                {...formItemLayout}
                name="bankNameB"
                label="Ngân hàng:"
                rules={[{ required: true, message: 'Vui lòng chọn phí!' }]}
                hasFeedback
              >
                <Select placeholder="Vui lòng chọn ngân hàng">
                  {bankList.map(item => {
                    return (
                      <Option value={item.TenNganHang}>
                        {item.TenNganHang}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                name="accountNumber"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số tài khoản!'
                  }
                ]}
                label="Số tài khoản:"
              >
                <AutoComplete
                  onChange={e => handleChangeAutoComplete(e)}
                  placeholder="Nhập vào STK hoặc chọn người nhận!"
                  options={options}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                name="nameB"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên người hưởng!'
                  }
                ]}
                label="Người hưởng:"
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Vui lòng nhập tên người hưởng!"
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>
        <br />
        <Card
          headStyle={{ background: '#fafafa' }}
          title="THÔNG TIN GIAO DỊCH"
          style={{ width: '100%' }}
        >
          <Form.Item
            {...formItemLayout}
            name="amount"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số tiền'
              }
            ]}
            label="Số tiền chuyển:"
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={20000000}
              placeholder="Vui lòng nhập số tiền"
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="content"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập nội dung chuyển tiền!'
              }
            ]}
            label="Nội dung chuyển tiền"
            hasFeedback
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="amountType"
            label="Phí chuyển tiền"
            rules={[{ required: true, message: 'Vui lòng chọn phí!' }]}
            hasFeedback
          >
            <Select placeholder="Vui lòng chọn phí">
              <Option value="china">Người chuyển trả</Option>
              <Option value="usa">Người hưởng trả</Option>
            </Select>
          </Form.Item>
          <Button
            style={{ float: 'right', marginRight: '20%' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Chuyển tiền
          </Button>
        </Card>
        <DialogOTP
          open={openModal}
          data={formData}
          handleClose={() => setOpenModal(false)}
        />
      </Form>
    </Spin>
  );
};

export default ExternalTransaction;
