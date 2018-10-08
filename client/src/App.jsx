import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Logout from './components/Logout/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import Survey from './components/Survey/Survey';
import Units from './components/Units/Units';

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
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/units" component={Units} />
            <Route exact path="/survey" component={Survey} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
