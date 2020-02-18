import React, {Component} from 'react';
import { Table, Input, InputNumber, Form, Button, Icon } from 'antd';

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    transCode: 123456780 + i,
    accountA: i / 2 === 0 ? `nguyenvan${i}` : `nguyenthi${i}`,
    usernameA: i / 2 === 0 ? `Nguyễn Văn ${i}` : `Nguyễn Thị ${i}`,
    bankNameA: i / 2 === 0 ? `USA` : `JAV`,
    accountB: i / 2 === 0 ? `tranvan${i}` : `tranthi${i}`,
    usernameB: i / 2 === 0 ? `Trần Văn ${i}` : `Trần Thị ${i}`,
    bankNameB: i / 2 === 0 ? `CHIWA` : `CHANI`,
    // amount: 5000000 * (i + 1),
    // transType: i / 2 === 0 ? `Gửi` : `Trả Nợ`,
    // fee: i / 2 === 0 ? `Người A` : `Người B`,
    // note: i / 2 === 0 ? `Trả tiền abx` : `Gửi tiền abx`,
    time: new Date() + "",
    status: i / 2 === 0 ? 'Đã gửi' : 'Đã nhận',
  });
}

class Comparison extends Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: 'Mã giao dịch',
        dataIndex: 'transCode',
        width: '10%',
        editable: true,
      },
      {
        title: 'Tài khoản A',
        dataIndex: 'accountA',
        width: '10%',
        editable: true,
      },
      {
        title: 'Họ tên A',
        dataIndex: 'usernameA',
        width: '10%',
        editable: true,
      },
      {
        title: 'Tên ngân hàng A',
        dataIndex: 'bankNameA',
        width: '10%',
        editable: true,
      },
      {
        title: 'Tài khoản B',
        dataIndex: 'accountB',
        width: '10%',
        editable: true,
      },
      {
        title: 'Họ tên B',
        dataIndex: 'usernameB',
        width: '10%',
        editable: true,
      },
      {
        title: 'Tài khoản B',
        dataIndex: 'accountB',
        width: '10%',
        editable: true,
      },
      {
        title: 'Tên ngân hàng B',
        dataIndex: 'bankNameB',
        width: '10%',
        editable: true,
      },
      // {
      //   title: 'Số tiền',
      //   dataIndex: 'amount',
      //   width: '5%',
      //   editable: true,
      // },
      // {
      //   title: 'Loại giao dịch',
      //   dataIndex: 'transType',
      //   width: '10%',
      //   editable: true,
      // },
      // {
      //   title: 'Phí trả',
      //   dataIndex: 'fee',
      //   width: '5%',
      //   editable: true,
      // },
      // {
      //   title: 'Ghi chú',
      //   dataIndex: 'note',
      //   width: '10%',
      //   editable: true,
      // },
      {
        title: 'Thời gian',
        dataIndex: 'time',
        width: '10%',
        editable: true,
      },
      {
        title: 'Tình trạng',
        dataIndex: 'status',
        width: '10%',
        editable: true,
      },
    ];
  }

  render() {
    const {data} = this.state

    return (
      <Table
        bordered
        dataSource={data}
        columns={this.columns}
        rowClassName="editable-row"
        pagination={{
          onChange: this.cancel,
        }}
      />
    );
  }
}

export default Comparison;
