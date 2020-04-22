import React, { useEffect, useState } from 'react';
import { Table, Form, Row, Button, Icon, Col, Card, Input, Radio, Tag, Select } from 'antd';
import { transactionService } from '../../../services';
import { bankService } from '../../../services/bank.service';
const layout = {
  labelCol: {
    span: 3
  },
  wrapperCol: {
    span: 14
  }
};

const { Option } = Select;


const Comparison = props => {
  const [form] = Form.useForm()

  const columns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'ID_GiaoDich',
      width: '10%',
      editable: true,
      fixed: 'left'
    },
    {
      title: 'Tài khoản A',
      dataIndex: 'ID_TaiKhoan_TTTK_A',
      width: '10%',
      editable: true
    },
    {
      title: 'Họ tên A',
      dataIndex: 'Username_A',
      width: '10%',
      editable: true
    },
    {
      title: 'Tên ngân hàng A',
      dataIndex: 'TenNganHang_A',
      width: '10%',
      editable: true
    },
    {
      title: 'Tài khoản B',
      dataIndex: 'ID_NganHangLienKet_B',
      width: '10%',
      editable: true
    },
    {
      title: 'Họ tên B',
      dataIndex: 'Username_B',
      width: '10%',
      editable: true
    },
    {
      title: 'Tài khoản B',
      dataIndex: 'ID_NganHangLienKet_B',
      width: '10%',
      editable: true
    },
    {
      title: 'Tên ngân hàng B',
      dataIndex: 'TenNganHang_B',
      width: '10%',
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
            return <Tag color="yellow">Đòi tiền</Tag>;
          case 'TraNo':
            return <Tag color="yellow">Trả nợ</Tag>;
          case 'No':
            return <Tag color="red">Nợ</Tag>;
        }
      }
    },
    {
      title: 'Số tiền',
      dataIndex: 'SoTien',
      width: '10%',
      editable: true
    },
    {
      title: 'Người trả phí',
      dataIndex: 'NguoiTraPhi',
      width: '10%',
      editable: true
    },
    {
      title: 'Ghi chú',
      dataIndex: 'GhiChu',
      width: '10%',
      editable: true
    },
    {
      title: 'Thời gian',
      dataIndex: 'ThoiGian',
      width: '10%',
      editable: true
    },
    {
      title: 'Tình trạng',
      dataIndex: 'TinhTrang',
      width: '10%',
      fixed: 'right',
      editable: true,
      render: (text, record) => {
        switch (record.TinhTrang) {
          case 'DaGui':
            return <Tag color="blue">Đã gửi</Tag>;
          case 'DaTra':
            return <Tag color="green">Đã trả</Tag>;
          case 'DaNhan':
            return <Tag color="green">Đã nhận</Tag>;
          case 'DangDoi':
            return <Tag color="yellow">Đang đòi</Tag>;
        }
      }
    }
  ];

  const [search, setSearch] = useState('')
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await transactionService.getAll();
      console.log('DATA=', result);

      if (result && result.success) {
        setData(result.data);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const [bankList, setBankList] = useState([]);
  useEffect(() => {
    async function getBankList() {
      const result = await bankService.getBankList()
      if (result && result.success) {
        setBankList(result.data)
      }
    }
    getBankList()
  }, []);

  const handleChangeSelected = (value) => {
    console.log(value)
    setSearch(value)
  }

  const fetchDataByQuery = async () => {
    setLoading(true);
    const query = search
    const result = await transactionService.getAll(query);
    console.log('DATA=', result);

    if (result && result.success) {
      setData(result.data);
      setLoading(false);
    }
  }

  const handleSearch = () => {
    fetchDataByQuery()
  }

  return (
    <>
      <Form {...layout} form={form}>
        <Card style={{ width: '100%', marginBottom: 10 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label="Ngân hàng">
                <Row gutter={16}>
                  <Col span={12}>
                  <Select onChange={(e) => handleChangeSelected(e)} placeholder="Chọn ngân hàng">
                  <Option value="">Xem tất cả</Option>
                  {
                    bankList.map(item => {
                      return <Option value={item.TenNganHang}>{item.TenNganHang}</Option>
                    })
                  }
                </Select>
                  </Col>
                  <Col span={12}>
                  <Button onClick={() => handleSearch()} style={{ marginLeft: 20 }}>Tìm kiếm</Button>

                  </Col>
                </Row>
                
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500 }}
      />
    </>
  );
};

export default Comparison;
