import React, { Component } from 'react';
import { Form, Select, Card, Input, InputNumber, Button, Col, Row } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const ExternalTransaction = props => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <Form form={form}>
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
                <span>12312314</span>
            </div>
            <br />
            <div>
              <label>Số dư khả dụng:</label>
                &nbsp;
                <span>120.000.000 VNĐ</span>
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
              name="selectBanking"
              label="Ngân hàng:"
              rules={[
                { required: true, message: 'Vui lòng chọn phí!' }
              ]}
              hasFeedback>
              <Select placeholder="Vui lòng chọn phí">
                <Option value="china">China Banking</Option>
                <Option value="usa">Japan Banking</Option>
                <Option value="taiwain">Taiwain Banking</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="accountNumber"
              rules={[{
                required: true,
                message: 'Vui lòng nhập số tài khoản!'
              }]}
              label="Số tài khoản:">
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={20000000}
                placeholder="Vui lòng nhập số tài khoản!"
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="recipientName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số tài khoản!'
                }
              ]}
              label="Người hưởng:">
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
          label="Số tiền chuyển:">
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
          hasFeedback>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="amountType"
          label="Phí chuyển tiền"
          rules={[{ required: true, message: 'Vui lòng chọn phí!' }]}
          hasFeedback>
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
    </Form>
  )
}

export default ExternalTransaction;
