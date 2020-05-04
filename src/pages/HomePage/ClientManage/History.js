import React, { useEffect, useState } from 'react';
import { Form, Modal, Spin, Input, Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transactionService } from '../../../services';
import { notificationActions } from '../../../actions/notification.action';
import moment from 'moment';

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
        const result = await transactionService.getTransByUser(
          props.data.Username
        );
        console.log(props.data.Username);
        if (result && result.success) {
          const data = [];
          result.data.map(item => {
            item.ThoiGian = moment(item.ThoiGian).format('hh:mm:ss DD/MM/YYYY');
            data.push(item);

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
      width: '15%',
      fixed: 'left',
      editable: true
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'ID_TaiKhoan_TTTK_B',
      width: '15%',
      editable: true
    },
    {
      title: 'Biệt Danh',
      dataIndex: 'BietDanh',
      width: '15%',
      editable: true,
      render: (text, record) => {
        return <Tag color="blue">{record.BietDanh}</Tag>;
      }
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'TenNganHang',
      width: '15%',
      editable: true,
      render: (text, record) => {
        return <Tag color="blue">{record.TenNganHang}</Tag>;
      }
    },
    {
      title: 'Số tiền',
      dataIndex: 'SoTien',
      width: '15%',
      editable: true
    },
    {
      title: 'Người trả phí',
      dataIndex: 'NguoiTraPhi',
      width: '20%',
      editable: true,
      render: (text, record) => {
        return <Tag color="pink">{record.NguoiTraPhi}</Tag>;
      }
    },
    {
      title: 'Nội dung',
      dataIndex: 'GhiChu',
      width: '25%',
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
          case 'Doi':
            return <Tag color="orange">Đòi tiền</Tag>;
          case 'No':
            return <Tag color="red">Nợ</Tag>;
          case 'TraNo':
            return <Tag color="orange">Trả nợ</Tag>;
          case 'NhanTienNo':
            return <Tag color="green">Nhận tiền nợ</Tag>;
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
      fixed: 'right',
      width: '15%',
      editable: true,
      render: (text, record) => {
        switch (record.TinhTrang) {
          case 'DaGui':
            return <Tag color="blue">Đã gửi</Tag>;
          case 'DaNhan':
            return <Tag color="green">Đã nhận</Tag>;
          case 'DangDoi':
            return <Tag color="yellow">Đang đòi</Tag>;
          case 'DaNhan':
            return <Tag color="green">Đã nhận</Tag>;
          case 'HuyDoi':
            return <Tag color="orange">Hủy đòi</Tag>;
          case 'DaTraNo':
            return <Tag color="green">Đã trả nợ</Tag>;
          case 'DangNo':
            return <Tag color="yellow">Đang nợ</Tag>;
          case 'NhanTienNo':
            return <Tag color="green">Nhận tiền nợ</Tag>;
        }
      }
    }
  ];

  return (
    <Modal
      width={1000}
      maskClosable={false}
      title="Lịch sử giao dịch"
      visible={visible}
      onOk={() => props.handleClose()}
      onCancel={() => props.handleClose()}
      cancelText="Đóng"
    >
      <Table
        scroll={{ x: 1000 }}
        loading={isLoading}
        bordered
        rowKey="ID_GiaoDich"
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: () => {}
        }}
      />
    </Modal>
  );
};

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
