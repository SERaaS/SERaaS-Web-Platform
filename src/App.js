import React from 'react';
import logo from './logo.svg';
import './App.css';

// react-bootstrap dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage'

function App() {
  return (
    <div className="App" style={{ marginTop: '40px', marginLeft: '40px', marginRight: '40px' }}>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <LoginPage />
    </div>
  );
}

export default App;
