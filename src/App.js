import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import routes from "./routes";

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((it, idx) => {
          return <Route
            key={idx}
            path={it.path}
            exact={it.exact}
            component={it.component}
          />
        })}
      </Switch>
    </Router>
  );
}

export default App;

