import React, {Component} from 'react';
import InternalTransaction from "./InternalTransaction/InternalTransaction";
import ExternalTransaction from "./ExternalTransaction/ExternalTransaction";
import AccountList from "./AccountManage/AccountList";
import TransactionHistory from "./TransHistory/TransactionHistory";
import DebtList from "./DebtNotice/DebtList";
import SettingDebt from "./DebtNotice/SettingDebt";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Dropdown,
  Button,
  Badge,
  Avatar,
} from 'antd';
import Setting from "./Setting/Setting";
import ListUser from "../ClientManage/ListUer";
import Employee from "../Admin/Employee";
import axios from 'axios'
import to from 'await-to-js'
import { message } from 'antd';
import { connect } from 'react-redux'
import { store_User } from '../store/store'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: <AccountList/>
    }
  }

  componentDidMount = async() => {
    await this.getProfileUser()
  }

  logout = () => {
    this.props.dispatch(store_User(null))
    localStorage.clear()
    this.props.history.push("/");
  }

  renderUser = () => {
    return (
      <Menu>
        <Menu.Item>
          <a onClick={this.logout}>
            Thoát
          </a>
        </Menu.Item>
      </Menu>
    )
  }

  getProfileUser = async() => {
    let token = JSON.parse(localStorage.getItem("token"))

    if (token && token !== null) {
      let accessToken = token.accessToken
      let [ err, response ] = await to(axios.get(`http://localhost:5000/api/v1/user/info`, {
        headers: { Authorization: `JWT ${accessToken}` }
      }))
  
      if (err) {
        message.error(err, 2.5)
        return
      }

      let data = response.data
      if (data.success) {
        this.props.dispatch(store_User(data.user))
      } else {
        this.props.dispatch(store_User(null))
        localStorage.clear()
        this.props.history.push("/")
      }
    } else {
      this.props.history.push("/")
    }
  }

  handleOnChangePage = (type) => {
    console.log(type)
    switch(type) {
      case 'accountList':
        this.setState({content: <AccountList/>})
        break
      case 'internalTrans':
        this.setState({content: <InternalTransaction/>})
        break
      case 'externalTrans':
        this.setState({content: <ExternalTransaction/>})
        break
      case 'transHistory':
        this.setState({content: <TransactionHistory/>})
        break
      case 'settingDebt':
        this.setState({content: <SettingDebt/>})
        break
      case 'debtList':
        this.setState({content: <DebtList/>})
        break
      case 'setting':
        this.setState({content: <Setting/>})
        break
      case 'userList':
        this.setState({content: <ListUser/>})
        break
      case 'employeeList':
        this.setState({content: <Employee/>})
        break
      default:
        break
    }
  }

  render() {
    const {content} = this.state
    return (
      <Layout>
        <Header className="header">
          <div className="logo">
            <p style={{lineHeight: '30px', fontSize: 14, fontWeight: 'bold', color:'white', textAlign: 'center'}}>Internet Banking</p>
          </div>
          <Menu
            //theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', background: '#005030', color: 'white' }}
          >
            <Menu.Item key="1">Tiết kiệm trực tuyến</Menu.Item>
            <Menu.Item key="2">Tiện ích gia tăng</Menu.Item>
            <Menu.Item key="3">Hỗ trợ giao dịch</Menu.Item>

            <div style={{float: 'right'}}>
              <Badge dot>
                <Icon type="notification" />
              </Badge>
              <Dropdown overlay={this.renderUser}>
                <a style={{float: 'right', marginLeft: 10}} className="ant-dropdown-link" href="#">
                  <Avatar>USER</Avatar>
                </a>
              </Dropdown>
            </div>

          </Menu>
        </Header>
        <Layout>
          <Sider width={250} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                <Icon type="appstore" />
                Chức năng
              </span>
                }
              >
                <Menu.Item key="1" onClick={() => this.handleOnChangePage("accountList")}>
                  <Icon type="solution" />
                  <span>Danh sách tài khoản</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={() => this.handleOnChangePage("internalTrans")}>
                  <Icon type="retweet" />
                  <span >Chuyển khoản nội bộ</span>
                </Menu.Item>
                <Menu.Item key="3" onClick={() => this.handleOnChangePage("externalTrans")}>
                  <Icon type="swap" />
                  <span>Chuyển khoản liên ngân hàng</span>
                </Menu.Item>
                <Menu.Item key="4" onClick={() => this.handleOnChangePage("transHistory")}>
                  <Icon type="history" />
                  <span>Lịch sử giao dịch</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                <Icon type="bell" />
                Nhắc Nợ
              </span>
                }
              >
                <Menu.Item key="5" onClick={() => this.handleOnChangePage("settingDebt")}>
                  <Icon type="setting" />Thiết lập
                </Menu.Item>
                <Menu.Item key="6" onClick={() => this.handleOnChangePage("debtList")}>
                  <Icon type="container" />Danh sách nợ
                  <Badge style={{marginLeft: 10}} count={1000} overflowCount={999}/>
                  </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="control" />
                    Quản trị khách hàng
                </span>
                }
              >
                <Menu.Item key="9" onClick={() => this.handleOnChangePage("userList")}>
                  <Icon type="setting"/>Danh sách khách hàng
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="control" />
                    Administrator
                </span>
                }
              >
                <Menu.Item key="19" onClick={() => this.handleOnChangePage("employeeList")}>
                  <Icon type="setting"/>Danh sách nhân viên
                </Menu.Item>
                <Menu.Item key="191" onClick={() => this.handleOnChangePage("employeeList")}>
                  <Icon type="setting"/>Đối soát
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                <Icon type="control" />
                Cấu hình
              </span>
                }
              >
                <Menu.Item key="10" onClick={() => this.handleOnChangePage("setting")}><Icon type="setting" />Đổi mật khẩu</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
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
              {content}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(HomePage)