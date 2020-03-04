import React, { Component } from 'react';
import { Form, Select, Card, Input, InputNumber, Button, Col, Row } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

class ExternalTransaction extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
              <Form.Item label="Ngân hàng:" hasFeedback>
                {getFieldDecorator('selectBanking', {
                  rules: [{ required: true, message: 'Vui lòng chọn phí!' }]
                })(
                  <Select placeholder="Vui lòng chọn phí">
                    <Option value="china">China Banking</Option>
                    <Option value="usa">Japan Banking</Option>
                    <Option value="taiwain">Taiwain Banking</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="Số tài khoản:">
                {getFieldDecorator('accountNumber', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập số tài khoản!'
                    }
                  ]
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={20000000}
                    placeholder="Vui lòng nhập số tài khoản!"
                  />
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="Người hưởng:">
                {getFieldDecorator('recipientName', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập số tài khoản!'
                    }
                  ]
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Vui lòng nhập tên người hưởng!"
                  />
                )}
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
          <Form.Item {...formItemLayout} label="Số tiền chuyển:">
            {getFieldDecorator('amount', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập số tiền'
                }
              ]
            })(
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={20000000}
                placeholder="Vui lòng nhập số tiền"
              />
            )}
          </Form.Item>
          <Form.Item label="Nội dung chuyển tiền" hasFeedback>
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập nội dung chuyển tiền!'
                }
              ]
            })(<TextArea rows={4} />)}
          </Form.Item>
          <Form.Item label="Phí chuyển tiền" hasFeedback>
            {getFieldDecorator('amountType', {
              rules: [{ required: true, message: 'Vui lòng chọn phí!' }]
            })(
              <Select placeholder="Vui lòng chọn phí">
                <Option value="china">Người chuyển trả</Option>
                <Option value="usa">Người hưởng trả</Option>
              </Select>
            )}
          </Form.Item>
          <Button
            style={{ float: 'right' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Chuyển tiền
          </Button>
        </Card>
      </Form>
    );
  }
}

export default ExternalTransaction;
