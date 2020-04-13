import React, {useEffect} from 'react';
import './App.css';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import { history } from './helpers';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import socketIOClient from "socket.io-client";
import { notification } from 'antd';

function App() {
  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:5000');
    socket.on("DEBT_NOTICE", data => {
      console.log("DATA_NOTICE=", data)
      notification.warning({
        message: 'Nhắc nợ',
        duration: 0,
        description:
          `Số tài khoản: ${data.accountNumberA} đã yêu cầu bạn trả với số tiền là ${data.amount} đ với nội dung: "${data.note}".`,
      });
    })
  }, [])

  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/home"
          render={props => {
            return localStorage.getItem('user') ? (
              <HomePage {...props} />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route path="/login" component={LoginPage} />
        <Redirect path="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
