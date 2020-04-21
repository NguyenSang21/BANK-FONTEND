import React, { useEffect, useState } from 'react'
import { Form, Modal, Spin, Input, Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transactionService } from '../../../services';
import { notificationActions } from '../../../actions/notification.action';
import moment from 'moment'

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 14
  }
};

const History = props => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (props.data.Username) {
        setLoading(true);
        const result = await transactionService.getTransByUser(props.data.Username);
        console.log(props.data.Username)
        if (result && result.success) {
          const data = [];
          result.data.map(item => {
            if (item.LoaiGiaoDich === 'Nhan' || item.LoaiGiaoDich === 'Gui') {
              item.ThoiGian = moment(item.ThoiGian).format('hh:mm:ss DD/MM/YYYY');
              data.push(item)
            }
            return item;
          });
          setData(data);
          setLoading(false);
        }
      }
    }
    fetchData();
    setVisible(props.open);
  }, [props.data]);

  const columns = [
    {
      title: 'Số giao dịch',
      dataIndex: 'ID_GiaoDich',
      width: '25%',
      editable: true
    },
    {
      title: 'Nội dung',
      dataIndex: 'GhiChu',
      width: '25%',
      editable: true
    },
    {
      title: 'Số tiền',
      dataIndex: 'SoTien',
      width: '20%',
      editable: true
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'LoaiGiaoDich',
      width: '15%',
      editable: true,
      render: (text, record) => {
        switch (record.LoaiGiaoDich) {
          case 'Gui':
            return <Tag color="blue">Gửi tiền</Tag>;
          case 'Nhan':
            return <Tag color="green">Nhận tiền</Tag>;
        }
      }
    },
    {
      title: 'Thời gian',
      dataIndex: 'ThoiGian',
      width: '15%',
      editable: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TrangThai',
      width: '15%',
      editable: true,
      render: (text, record) => {
        switch (record.TinhTrang) {
          case 'DaGui':
            return <Tag color="blue">Đã gửi</Tag>;
          case 'DaNhan':
            return <Tag color="green">Đã nhận</Tag>;
        }
      }
    }
  ];

  return (
    <Modal
      width={900}
      maskClosable={false}
      title="Lịch sử giao dịch"
      visible={visible}
      onOk={() => props.handleClose()}
      onCancel={() => props.handleClose()}
      cancelText="Đóng"
    >
      <Table
        loading={isLoading}
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: () => { }
        }}
      />
    </Modal>
  )
}

History.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

const actionCreators = {
  notify_success: notificationActions.success,
  notify_failure: notificationActions.failure
};

export default connect(null, actionCreators)(History);

