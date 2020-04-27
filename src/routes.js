import React from 'react';
import AccountManage from './pages/HomePage/AccountManage';
import InternalTransaction from './pages/HomePage/InternalTransaction';
import ExternalTransaction from './pages/HomePage/ExternalTransaction';
import TransHistory from './pages/HomePage/TransHistory';
import SettingDebt from './pages/HomePage/DebtNotice/SettingDebt';
import DebtList from './pages/HomePage/DebtNotice/DebtList';
import UserList from './pages/HomePage/ClientManage/UserList';
import Setting from './pages/HomePage/Setting';
import Comparison from './pages/HomePage/Comparison';
import Employee from './pages/HomePage/Administrator/Employee';
import {
  SolutionOutlined,
  RetweetOutlined,
  SwapOutlined,
  HistoryOutlined,
  AppleOutlined,
  BellOutlined,
  SettingOutlined,
  ContainerOutlined,
  ControlOutlined,
  SyncOutlined
} from '@ant-design/icons';
import RecieverList from './pages/HomePage/RecievertList';
import Profile from './pages/HomePage/Profile';

const routes = [
  {
    name: 'Chức năng',
    subMenu: 'appsMenu',
    icon: <AppleOutlined />,
    items: [
      {
        path: '/account-list',
        exact: true,
        icon: <SolutionOutlined />,
        layout: '/home',
        name: 'Danh sách tài khoản',
        component: <AccountManage />
      },
      {
        path: '/reviever-list',
        exact: true,
        icon: <SolutionOutlined />,
        layout: '/home',
        name: 'Danh sách người nhận',
        component: <RecieverList />
      },
      {
        path: '/internal-trans',
        exact: true,
        icon: <RetweetOutlined />,
        layout: '/home',
        name: 'Chuyển nội bộ',
        component: <InternalTransaction />
      },
      {
        path: '/external-trans',
        exact: true,
        icon: <SwapOutlined />,
        layout: '/home',
        name: 'Chuyển liên ngân hàng',
        component: <ExternalTransaction />
      },
      {
        path: '/transaction-history',
        exact: true,
        icon: <HistoryOutlined />,
        layout: '/home',
        name: 'Lịch sử giao dịch',
        component: <TransHistory />
      }
    ]
  },
  {
    name: 'Nhắc nợ',
    subMenu: 'debtMenu',
    icon: <BellOutlined />,
    items: [
      {
        path: '/setting-debt',
        exact: true,
        icon: <SettingOutlined />,
        layout: '/home',
        name: 'Thiết lập',
        component: <SettingDebt />
      },
      {
        path: '/debt-list',
        exact: true,
        icon: <ContainerOutlined />,
        layout: '/home',
        name: 'Danh sách nợ',
        component: <DebtList />
      }
    ]
  },
  {
    name: 'Quản trị khách hàng',
    subMenu: 'userManageMenu',
    icon: <ControlOutlined />,
    items: [
      {
        path: '/user-list',
        exact: true,
        icon: <SolutionOutlined />,
        layout: '/home',
        name: 'Danh sách khách hàng',
        component: <UserList />
      }
    ]
  },
  {
    name: 'Administrator',
    subMenu: 'adminMenu',
    icon: <ControlOutlined />,
    items: [
      {
        path: '/employee-list',
        exact: true,
        icon: <SolutionOutlined />,
        layout: '/home',
        name: 'Danh sách nhân viên',
        component: <Employee />
      }
    ]
  },
  {
    name: 'Đối soát',
    subMenu: 'comparisonMenu',
    icon: <SyncOutlined />,
    items: [
      {
        path: '/comparison',
        exact: true,
        icon: <SyncOutlined />,
        layout: '/home',
        name: 'Đối soát',
        component: <Comparison />
      }
    ]
  },
  {
    name: 'Setting',
    subMenu: 'settingMenu',
    icon: <SettingOutlined />,
    items: [
      {
        path: '/setting',
        exact: true,
        icon: <SettingOutlined />,
        layout: '/home',
        name: 'Đổi mật khẩu',
        component: <Setting />
      }
    ]
  }
];

export default routes;
