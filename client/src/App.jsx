import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Logout from './components/Logout/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';
import Units from './components/Units/Units';
import Survey from './components/Survey/Survey';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="logout-container">
          <Logout />
        </div>
        <Router>
          <Switch>
            <Route path="/units" component={Units} />
            <Route path="/survey" component={Survey} />
            <Route exact path="/" component={Dashboard} />
            <Dashboard />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
