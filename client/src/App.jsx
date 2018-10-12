import React, { Component } from 'react';
import Logout from './components/Logout/Logout';
import Survey from './components/Survey/Survey';
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
          <Survey questions={answers} />
        </div>
      </div>
    );
  }
}

export default App;
