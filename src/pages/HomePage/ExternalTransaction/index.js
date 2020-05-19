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
import {
  userService,
  transactionService,
  clientService
} from '../../../services';
import { bankService } from '../../../services/bank.service';
import DialogOTP from './DialogOTP';
import { recieverService } from '../../../services/reciever.service';
import shortid from 'shortid';
import { externalService } from '../../../services/external.service';

const { Option } = Select;
const { TextArea } = Input;

const ExternalTransaction = props => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [recipient, setRecipient] = useState({});
  const [agentSecretKey, setAgentSecretKey] = useState("")

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

  const [options, setOptions] = useState([]);
  useEffect(() => {
    async function getBietDanh() {
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
    getBietDanh();
  }, []);

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

  const onFinish = async values => {
    //setLoading(true);

    const userDetail = JSON.parse(localStorage.getItem('user'));
    values.accountNumberA = userInfo.ID_TaiKhoanTTTK;
    values.username = userDetail.username;
    values.agentSecretKey = agentSecretKey
    console.log(values)

    const result = await transactionService.getOTP(userDetail.username, values);

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

      form.setFieldsValue({ nameB: userInfo.HoTen });
      form.setFieldsValue({ bankNameB: userInfo.TenNganHang });
    }
  };

  const getUserByAcountNumber = async id => {
    const result = await clientService.getInfoByTK(id);
    if (result && result.success) {
      return result.data[0] || '';
    }
    return {};
  };

  const getInfoRecipient = async () => {
    const bankName = form.getFieldValue('bankNameB')
    const stk = form.getFieldValue('accountNumberB')
    console.log(stk)
    const bank = await bankService.getBankByAgentCode(bankName)

    if (bank && bank.data) {
      setAgentSecretKey(bank.data.Key_Auth)
      const getInfo = await externalService.getRecipientInfo(bankName, { "SoTK": stk }, bank.data.Key_Auth)
      console.log(getInfo)
      setRecipient(getInfo)
    }

  }

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
  };

  const formItemLayout2 = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <Spin spinning={loading}>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
        <Row gutter={16}>
          <Col span={8}>
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
          <Col span={8}>
            <Card
              headStyle={{ background: '#fafafa' }}
              title="TÙY CHỈNH"
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
                      <Option key={shortid()} value={item.TenNganHang}>
                        {item.TenNganHang}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                name="accountNumberB"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số tài khoản!'
                  }
                ]}
                label="Số tài khoản:"
              >
                <AutoComplete
                  // onChange={e => handleChangeAutoComplete(e)}
                  placeholder="Nhập vào STK hoặc chọn người nhận!"
                  options={options}
                />
              </Form.Item>
              <Button onClick={() => getInfoRecipient()} style={{ float: 'right' }} type="primary">Kiểm tra</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              headStyle={{ background: '#fafafa' }}
              title="THÔNG TIN NGƯỜI NHẬN"
              style={{ width: '100%' }}
            >
              <div>
                <label>Tên khách hàng:</label>
                &nbsp;
                <span>{recipient && recipient.TenKH}</span>
              </div>
              <br />
              <div>
                <label>Số điện thoại:</label>
                &nbsp;
                <span>{recipient && recipient.SoDienThoai}</span>
              </div>
              <br />
              <br />
              <br />
              <br />
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
            {...formItemLayout2}
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
            {...formItemLayout2}
            name="note"
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
            {...formItemLayout2}
            name="payer"
            label="Phí chuyển tiền"
            rules={[{ required: true, message: 'Vui lòng chọn phí!' }]}
            hasFeedback
          >
            <Select placeholder="Vui lòng chọn phí">
              <Option value="A">Người chuyển trả</Option>
              <Option value="B">Người hưởng trả</Option>
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
