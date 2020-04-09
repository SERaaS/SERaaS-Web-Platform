import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MenuHeading from './components/reusable/MenuHeading';
import MenuNavBar from './components/reusable/MenuNavBar';
import Footer from './components/reusable/Footer';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import GettingStarted from './components/GettingStarted';

function App() {
  return (
    // Ensure there's empty space at the bottom
    <div className="App" style={{ marginBottom: "50px" }}>
      <div className="ui container">
        <Router>
          <MenuHeading />
          <MenuNavBar />

          <Switch>
            <Route path='/auth'>
              <LoginPage />
            </Route>
            <Route path='/getstarted'>
              <GettingStarted />
            </Route>
            <Route path='/'>
              <Dashboard />
            </Route>
          </Switch>

          <Footer />
        </Router> 
      </div>   
    </div>
  );
};

export default App;