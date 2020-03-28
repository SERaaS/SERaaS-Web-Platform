import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './components/Home';
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
            <Route path='/auth'>
              <LoginPage />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router> 
      </div>   
    </div>
  );
};

export default App;