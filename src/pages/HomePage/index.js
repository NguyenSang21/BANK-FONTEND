import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Badge, Avatar, Drawer, Row, Col, Divider } from 'antd';
import routes from '../../routes';
import SideBar from '../../components/SideBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotificationOutlined } from '@ant-design/icons';
import { userService } from '../../services';

const { Header, Content } = Layout;

const pStyle = {
  fontSize: 16,
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    className="site-description-item-profile-wrapper"
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
    }}
  >
    <p
      className="site-description-item-profile-p"
      style={{
        marginRight: 8,
        display: 'inline-block',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);
class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      infoData: []
    }
    this.menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={() => this.showDrawer()} href="#">Thông tin cá nhân</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a onClick={() => this.handleLogout()} href="#">Đăng xuất</a>
        </Menu.Item>
      </Menu>
    );
  }

  async componentWillMount() {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const result = await userService.getInfo(userInfo.username)
    console.log(result)
    if (result && result.success) {
      this.setState({ infoData: result.data })
    }
  }

  getRoutes = routes => {
    return routes.map(item => {
      return item.items.map((item, idx) => {
        return (
          <Route
            path={item.layout + item.path}
            render={() => item.component}
            key={item.layout + item.path}
          />
        );
      });
    });
  };

  handleOnclick = (e) => {
    e.preventDefault()
  }

  handleLogout = () => {
    console.log('logout')
    localStorage.removeItem('user')
    window.location.reload()
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const data = this.state.infoData
    return (
      <Layout>
        <Header style={{ background: '#24292e' }}>
          <div className="logo">
            <p
              style={{
                lineHeight: '30px',
                fontSize: 14,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center'
              }}
            >
              Internet Banking
            </p>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              lineHeight: '64px',
              background: '#24292e',
              color: 'white'
            }}
          >
            <Menu.Item key="1">Tiết kiệm trực tuyến</Menu.Item>
            <Menu.Item key="2">Tiện ích gia tăng</Menu.Item>
            <Menu.Item key="3">Hỗ trợ giao dịch</Menu.Item>
            <div style={{ float: 'right' }}>
              <Badge dot>
                <NotificationOutlined />
              </Badge>
              <Dropdown overlay={this.menu} trigger={['click']}>
                <a
                  style={{ float: 'right', marginLeft: 10 }}
                  className="ant-dropdown-link"
                  onClick={e => this.handleOnclick(e)}
                >
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
                </a>
              </Dropdown>
            </div>
          </Menu>
        </Header>
        <Layout>
          <SideBar {...this.props} routes={routes} />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Chức năng</Breadcrumb.Item>
              <Breadcrumb.Item>Danh sách tài khoản</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="/" to="/home/account-list" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p className="site-description-item-profile-p" style={{ ...pStyle, marginBottom: 24 }}>
            Thông tin cá nhân
          </p>
          <p className="site-description-item-profile-p" style={pStyle}>
            Chi tiết
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Mã khách hàng" content={data.length !== 0 && data.ID_TaiKhoan} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Họ tên" content={data.length !== 0 && data.HoTen} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Email"
                content={data.length !== 0 && data.Email}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Điện thoại" content={data.length !== 0 && data.DienThoai} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Ngày sinh" content="February 2,1900" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Địa chỉ" content="32 Cách Mạng Tháng 8, Quận Tân Bình, HCM" />
            </Col>
          </Row>
        </Drawer>
      </Layout>
    );
  }
}

export default HomePage;
