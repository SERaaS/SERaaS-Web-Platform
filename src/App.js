import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <div className="ui container">
        <Router>
          <Switch>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/'>
              <LoginPage />
            </Route>
          </Switch>
        </Router> 
      </div>   
    </div>
  );
};

export default App;