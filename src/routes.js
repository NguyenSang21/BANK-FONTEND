import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";

const routes = [
  {
    path: '/',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/home',
    exact: true,
    component: HomePage,
  }
]

export default routes
