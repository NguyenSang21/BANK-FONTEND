import React from 'react';
import './App.css';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import PrivateRoute from './Components/PrivateRoute';
import { history } from './helpers';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
      </Switch>
    </Router>
  );
}

export default App;
