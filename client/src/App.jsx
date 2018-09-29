import React, { Component } from 'react';
import Survey from './components/Survey/Survey';
import SurveyTest from './components/Survey/SurveyTest';
import './App.css';

class App extends Component {
  render() {
    return (
      <Survey
        questions={[
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
        ]}
      />
    );
  }
}

export default App;
