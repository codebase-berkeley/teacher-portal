import React, { Component } from 'react';
import Logout from './components/Logout/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="logout-container">
          <Logout />
        </div>
        <Dashboard />
      </div>
    );
  }
}

export default App;
