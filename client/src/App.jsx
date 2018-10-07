import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Logout from './components/Logout/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

const answers = [
  ['unit', 'Macbeth'],
  ['section', 'Student Engagement'],
  ['star', 'How interesting did you find this unit?'],
  [
    'mc',
    'Which of the following reasons was the reason you enjoyed this unit?',
    [
      'Riveting textual engagement',
      'Fascinating character dialogue',
      'Good',
      'Kinky'
    ]
  ],
  ['frq', 'What aspects of the unit may need some work?']
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="logout-container">
          <Logout />
        </div>
        <Router>
          <Switch>
            <Dashboard />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
