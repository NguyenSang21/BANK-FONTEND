import React from 'react';
import { Table, Input, InputNumber, Form, Button, Icon } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    stk: 123456780 + i,
    accountType: i / 2 === 0 ? 'Tiết kiệm' : 'Thanh toán',
    amount: 5000000 * (i + 1),
    moneyType: i / 2 === 0 ? 'VNĐ' : 'USD'
  });
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: 'Số tài khoản',
        dataIndex: 'stk',
        width: '25%',
        editable: true
      },
      {
        title: 'Loại Tài Khoản',
        dataIndex: 'accountType',
        width: '25%',
        editable: true
      },
      {
        title: 'Số Tiền',
        dataIndex: 'amount',
        width: '15%',
        editable: true
      },
      {
        title: 'Loại Tiền',
        dataIndex: 'moneyType',
        width: '15%',
        editable: true
      },
      {
        title: 'Actions',
        dataIndex: 'detail',
        width: '20%',
        editable: true,
        render: (text, record) => {
          return (
            <Button
              onClick={() => {
                console.log(record);
              }}
            >
              <DeleteOutlined />
              Xem chi tiết
            </Button>
          );
        }
      }
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const MyTable = Form.create()(EditableTable);

export default MyTable;
