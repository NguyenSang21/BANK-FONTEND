import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(props.location.pathname);

  useEffect(() => {
    console.log(props.location.pathname);
    setSelectedKey(props.location.pathname);
  }, [props.location.pathname]);

  const { routes } = props || [];
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      width={250}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {routes.map((item, idx) => {
          return (
            <SubMenu
              key={`sub${idx + 1}`}
              title={
                <span>
                  {item.icon} {item.name}
                </span>
              }
            >
              {item.items.map(item => {
                return (
                  <Menu.Item key={item.layout + item.path}>
                    {item.icon}
                    <span>{item.name}</span>
                    <Link to={item.layout + item.path} />
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
};

SideBar.propTypes = {
  routes: PropTypes.array
};

export default SideBar;
