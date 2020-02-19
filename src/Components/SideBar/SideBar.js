import React, {Component} from 'react'
import {
  Icon,
  Layout,
  Menu,
} from 'antd'
import {Link} from "react-router-dom"

const { SubMenu } = Menu
const { Sider } = Layout

class SideBar extends Component {
  constructor(props){
    super(props)
    this.state ={
      collapsed: false,
    }

    this.keyItem = 0
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const {routes} = this.props
    return (
      <Sider
        theme="light"
        collapsible
        collapsed={this.state.collapsed}
        width={250}
        onCollapse={this.onCollapse}
        style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            routes.map((item, idx) => {
            return <SubMenu
              key={`sub${idx + 1}`}
              title={<span>
                  <Icon type={item.icon}/>
                  {item.name}
              </span>}>
              {item.items.map((item, idx) => {
                return <Menu.Item key={idx}>
                    <Icon type={item.icon}/>
                    <span>{item.name}</span>
                    <Link to={item.layout + item.path}/>
                </Menu.Item>
              })}
            </SubMenu>
          })}
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
