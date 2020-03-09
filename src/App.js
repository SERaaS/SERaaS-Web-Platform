import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App" style={{ margin: 'auto', width: '75%', marginTop: '20px' }}>
      <Router>
        <Switch>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </Router>    
    </div>
  );
};

export default App;
