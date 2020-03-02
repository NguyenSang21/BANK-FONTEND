import React from 'react';
import './App.css';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { history } from './helpers';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
        <Redirect path="/" to="/login"/>
      </Switch>
    </Router>
  );
}

export default App;
