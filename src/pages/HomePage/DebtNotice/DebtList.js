import React, { Component } from 'react';
import { Form, Table, Button, Tag } from 'antd';

const EditableContext = React.createContext();
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    initiator: 'Nguyễn Văn ' + i,
    debtor: 'Nguyễn Thị ' + i,
    amount: 50000 * i + 10,
    type: i / 2 === 0 ? 0 : 1
  });
}
class DebtList extends Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: 'Người tạo(Nhắc nợ)',
        dataIndex: 'initiator',
        width: '25%',
        editable: true
      },
      {
        title: 'Người bị nợ',
        dataIndex: 'debtor',
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
        title: 'Loại',
        dataIndex: 'type',
        width: '15%',
        editable: true,
        render: (text, record) => {
          switch (record.type) {
            case 0:
              return <Tag color="red">Bị nợ</Tag>;
            case 1:
              return <Tag color="green">Nhắc nợ</Tag>;
          }
        }
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        width: '20%',
        editable: true,
        render: () => (
          <Button
            onClick={e => {
              console.log(e.target);
            }}
          >
            Hủy Nhắc Nợ
          </Button>
        )
      }
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

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
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
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
    );
  }
}

export default DebtList;
