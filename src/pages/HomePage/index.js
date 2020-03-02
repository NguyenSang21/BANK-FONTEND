import React, {Component} from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Dropdown,
  Badge,
  Avatar,
} from 'antd';
import routes from "../../routes";
import SideBar from "../../components/SideBar/SideBar";
import { Route, Switch, Redirect } from "react-router-dom";
import AccountList from "./AccountManage";

const { Header, Content } = Layout;

class HomePage extends Component {

  getRoutes = routes => {
    return routes.map(item => {
      return item.items.map((item, idx) => {
        return <Route
          path={ item.layout + item.path }
          component={item.component}
          key={`${Math.random().toString(36).substr(2, 5)}_${idx}`}
        />
      })
    })
  }

  render() {
    return (
      <Layout>
        <Header style={{background: '#3b6271'}}>
          <div className="logo">
            <p style={{lineHeight: '30px', fontSize: 14, fontWeight: 'bold', color:'white', textAlign: 'center'}}>Internet Banking</p>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            style={{ lineHeight: '64px', background: '#3b6271', color: 'white' }}
          >
            <Menu.Item key="1">Tiết kiệm trực tuyến</Menu.Item>
            <Menu.Item key="2">Tiện ích gia tăng</Menu.Item>
            <Menu.Item key="3">Hỗ trợ giao dịch</Menu.Item>
            <div style={{float: 'right'}}>
              <Badge dot>
                <Icon type="notification" />
              </Badge>
              <Dropdown>
                <a style={{float: 'right', marginLeft: 10}} className="ant-dropdown-link" href="#">
                  <Avatar>USER</Avatar>
                </a>
              </Dropdown>
            </div>
          </Menu>
        </Header>
        <Layout>
          <SideBar routes={routes}/>
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
                minHeight: 280,
              }}
            >
              <Switch>
                  {
                    this.getRoutes(routes)
                  }
                <Route path="/" component={AccountList}/>
                <Redirect from="*" to="/" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default HomePage
