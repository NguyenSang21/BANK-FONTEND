import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Badge, Avatar } from 'antd';
import routes from '../../routes';
import SideBar from '../../components/SideBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotificationOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;


class HomePage extends Component {
  constructor(props) {
    super(props)
    this.menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={() => this.handleLogout()} href="#">Đăng xuất</a>
        </Menu.Item>
      </Menu>
    );
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

  handleLogout= () => {
    console.log('logout')
    localStorage.removeItem('user')
    window.location.reload()
  }

  render() {
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
                  <Avatar>USER</Avatar>
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
      </Layout>
    );
  }
}

export default HomePage;
