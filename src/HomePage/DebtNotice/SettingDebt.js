import React, {Component} from 'react';
import {
  Form,
  Select,
  Card,
  Input,
  InputNumber,
  Button,
  Col,
  Row, Icon,
} from 'antd';

const {TextArea} = Input;

class SettingDebtFrom extends Component {

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
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Card extra={<Icon type="setting" />} headStyle={{background: '#fafafa'}} title="Tạo nhắc nợ" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Form.Item {...formItemLayout} label="Số tài khoản:">
                  {getFieldDecorator('accountNumber', {
                    rules: [
                      {
                        required: true,
                        message: 'Nhập số tài khoản người nợ!',
                      },
                    ],
                  })(<InputNumber style={{width: '100%'}} min={1} max={20000000} placeholder="Nhập số tài khoản người nợ!"/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Số tiền nợ:">
                  {getFieldDecorator('debtAmount', {
                    rules: [
                      {
                        required: true,
                        message: 'Nhập số tiền nợ cần trả!',
                      },
                    ],
                  })(<InputNumber style={{width: '100%'}} min={1} max={20000000} placeholder="Nhập số tiền nợ cần trả!"/>)}
                </Form.Item>
                <Form.Item label="Nội dung:" hasFeedback>
                  {getFieldDecorator('content', {
                    rules: [{required: true, message: 'Vui lòng nhập nội dung!'}],
                  })(<TextArea
                    rows={4}/>,
                  )}
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Thông tin tài khoản (Nợ)">
                <div>
                  <label>Số tài khoản:</label>
                  &nbsp;
                  <span>12312314</span>
                </div>
                <br/>
                <div>
                  <label>Chủ tài khoản:</label>
                  &nbsp;
                  <span>Sang Sang</span>
                </div>
                <br/>
                <div>
                  <label>Ngân hàng:</label>
                  &nbsp;
                  <span>JAV Banking</span>
                </div>
                <br/><br/><br/><br/>
              </Card>
            </Col>
          </Row>
          <Button style={{float: 'right'}} type="primary" htmlType="submit" className="login-form-button">
            Gủi nhắc nợ
          </Button>
        </Card>
      </Form>
    );
  }
}

const SettingDebt = Form.create({ name: 'validate_other' })(SettingDebtFrom)

export default SettingDebt;
