import React, { Component } from 'react';
import { Table, Form, Tag } from 'antd';

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    transNumber: 234657 + i,
    content: i % 2 === 0 ? 'Lương tháng' : 'Gửi lại tiền mượn',
    amount: `${i % 2 === 0 ? '-' : '+'} ${5000000 * (i + 1)}`,
    time: '12/12/2020',
    transType: i % 2 === 0 ? 0 : 1
  });
}

const EditableContext = React.createContext();

class TransHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: 'Số giao dịch',
        dataIndex: 'transNumber',
        width: '25%',
        editable: true
      },
      {
        title: 'Nội dung',
        dataIndex: 'content',
        width: '25%',
        editable: true
      },
      {
        title: 'Số tiền',
        dataIndex: 'amount',
        width: '20%',
        editable: true
      },
      {
        title: 'Loại giao dịch',
        dataIndex: 'transType',
        width: '15%',
        editable: true,
        render: (text, record) => {
          switch (record.transType) {
            case 0:
              return <Tag color="red">Tiền ra</Tag>;
            case 1:
              return <Tag color="green">Tiền vào</Tag>;
          }
        }
      },
      {
        title: 'Thời gian',
        dataIndex: 'time',
        width: '15%',
        editable: true
      }
    ];
  }

  render() {
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
          title: col.title
        })
      };
    });
    return (
      <div>
        <label>TEST TEST</label>
        <EditableContext.Provider value={this.props.form}>
          <Table
            bordered
            dataSource={this.state.data}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel
            }}
          />
        </EditableContext.Provider>
      </div>
    );
  }
}

export default TransHistory;
