
import AccountManage from "./pages/HomePage/AccountManage";
import InternalTransaction from "./pages/HomePage/InternalTransaction";
import ExternalTransaction from "./pages/HomePage/ExternalTransaction";
import TransHistory from "./pages/HomePage/TransHistory";
import SettingDebt from "./pages/HomePage/DebtNotice/SettingDebt";
import DebtList from "./pages/HomePage/DebtNotice/DebtList";
import UserList from "./pages/HomePage/ClientManage/UserList";
import Setting from "./pages/HomePage/Setting";
import Comparison from "./pages/HomePage/Comparison";
import Employee from "./pages/HomePage/Administrator/Employee";

const routes = [
  {
    name: 'Chức năng',
    subMenu: 'appsMenu',
    icon: 'appstore',
    items: [
      {
        path: '/account-list',
        exact: true,
        icon: 'solution',
        layout: '/home',
        name: 'Danh sách tài khoản',
        component: AccountManage,
      },
      {
        path: '/internal-trans',
        exact: true,
        icon: 'retweet',
        layout: '/home',
        name: 'Chuyển nội bộ',
        component: InternalTransaction,
      },
      {
        path: '/external-trans',
        exact: true,
        icon: 'swap',
        layout: '/home',
        name: 'Chuyển liên ngân hàng',
        component: ExternalTransaction,
      },
      {
        path: '/transaction-history',
        exact: true,
        icon: 'history',
        layout: '/home',
        name: 'Lịch sử giao dịch',
        component: TransHistory,
      },
    ]
  },
  {
    name: 'Nhắc nợ',
    subMenu: 'debtMenu',
    icon: 'bell',
    items: [
      {
        path: '/setting-debt',
        exact: true,
        icon: 'setting',
        layout: '/home',
        name: 'Thiết lập',
        component: SettingDebt,
      },
      {
        path: '/debt-list',
        exact: true,
        icon: 'container',
        layout: '/home',
        name: 'Danh sách nợ',
        component: DebtList,
      },
    ]
  },
  {
    name: 'Quản trị khách hàng',
    subMenu: 'userManageMenu',
    icon: 'control',
    items: [
      {
        path: '/user-list',
        exact: true,
        icon: 'solution',
        layout: '/home',
        name: 'Danh sách khách hàng',
        component: UserList,
      },
    ]
  },
  {
    name: 'Administrator',
    subMenu: 'adminMenu',
    icon: 'control',
    items: [
      {
        path: '/employee-list',
        exact: true,
        icon: 'solution',
        layout: '/home',
        name: 'Danh sách nhân viên',
        component: Employee,
      },
    ]
  },
  {
    name: 'Đối soát',
    subMenu: 'comparisonMenu',
    icon: 'sync',
    items: [
      {
        path: '/comparison',
        exact: true,
        icon: 'sync',
        layout: '/home',
        name: 'Đối soát',
        component: Comparison,
      },
    ]
  },
  {
    name: 'Setting',
    subMenu: 'settingMenu',
    icon: 'setting',
    items: [
      {
        path: '/setting',
        exact: true,
        icon: 'setting',
        layout: '/home',
        name: 'Cấu hình',
        component: Setting,
      },
    ]
  }
]

export default routes
