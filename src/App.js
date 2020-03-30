import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MenuHeading from './components/reusable/MenuHeading';
import MenuNavBar from './components/reusable/MenuNavBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import GettingStarted from './components/GettingStarted';

function App() {
  return (
    <div className="App">
      <div className="ui container">
        <Router>
          <MenuHeading />
          <MenuNavBar />

          <Switch>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/auth'>
              <LoginPage />
            </Route>
            <Route path='/getstarted'>
              <GettingStarted />
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