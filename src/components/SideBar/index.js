import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Router } from 'react-router-dom';
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

  const mapRule = (router) => {
    
    const matchRoute = []
    const userInfo = JSON.parse(localStorage.getItem('user'))

    const appsMenu = router.find(item => item.subMenu === 'appsMenu')
    const settingMenu = router.find(item => item.subMenu === 'settingMenu')
    
    const debtMenu = router.find(item => item.subMenu === 'debtMenu')
    const userManageMenu = router.find(item => item.subMenu === 'userManageMenu')

    const adminMenu = router.find(item => item.subMenu === 'adminMenu')
    const comparisonMenu = router.find(item => item.subMenu === 'comparisonMenu')

    console.log(userInfo.Loai)

    switch(userInfo.Loai) {
      case 'KH':
        matchRoute.push(appsMenu)
        matchRoute.push(settingMenu)
        break
      case 'AD':
        matchRoute.push(appsMenu)
        matchRoute[0].items = [matchRoute[0].items[0]]
        matchRoute.push(adminMenu)
        matchRoute.push(settingMenu)
        matchRoute.push(comparisonMenu)
        break
      case 'NV':
        matchRoute.push(appsMenu)
        matchRoute[0].items = [matchRoute[0].items[0]]
        matchRoute.push(userManageMenu)
        matchRoute.push(settingMenu)
        break
    }
    return matchRoute

  }

  const mapRuleRoute = mapRule(routes)

  console.log("ROUTES=", mapRuleRoute)

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
        {mapRuleRoute.map((item, idx) => {
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
