import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
      </Switch>
    </Router>
  );
}

export default App;
