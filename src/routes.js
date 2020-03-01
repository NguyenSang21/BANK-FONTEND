import AccountList from "./HomePage/AccountManage/AccountList";
import InternalTransaction from "./HomePage/InternalTransaction/InternalTransaction";
import ExternalTransaction from "./HomePage/ExternalTransaction/ExternalTransaction";
import TransactionHistory from "./HomePage/TransHistory/TransactionHistory";
import SettingDebt from "./HomePage/DebtNotice/SettingDebt";
import DebtList from "./HomePage/DebtNotice/DebtList";
import Setting from "./HomePage/Setting/Setting";
import ListUser from "./HomePage/ClientManage/ListUer";
import Employee from "./HomePage/Admin/Employee";
import Comparison from "./HomePage/Comparison/Comparison";

const routes = [
  {
    name: 'Chức năng',
    subMenu: 'appsMenu',
    icon: 'appstore',
    items: [
      {
        path: '/accountList',
        exact: true,
        icon: 'solution',
        layout: '/home',
        name: 'Danh sách tài khoản',
        component: AccountList,
      },
      {
        path: '/internalTrans',
        exact: true,
        icon: 'retweet',
        layout: '/home',
        name: 'Chuyển nội bộ',
        component: InternalTransaction,
      },
      {
        path: '/externalTrans',
        exact: true,
        icon: 'swap',
        layout: '/home',
        name: 'Chuyển liên ngân hàng',
        component: ExternalTransaction,
      },
      {
        path: '/TransactionHistory',
        exact: true,
        icon: 'history',
        layout: '/home',
        name: 'Lịch sử giao dịch',
        component: TransactionHistory,
      },
    ]
  },
  {
    name: 'Nhắc nợ',
    subMenu: 'debtMenu',
    icon: 'bell',
    items: [
      {
        path: '/settingDebt',
        exact: true,
        icon: 'setting',
        layout: '/home',
        name: 'Thiết lập',
        component: SettingDebt,
      },
      {
        path: '/debtList',
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
        path: '/userList',
        exact: true,
        icon: 'solution',
        layout: '/home',
        name: 'Danh sách khách hàng',
        component: ListUser,
      },
    ]
  },
  {
    name: 'Administrator',
    subMenu: 'adminMenu',
    icon: 'control',
    items: [
      {
        path: '/employeeList',
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
