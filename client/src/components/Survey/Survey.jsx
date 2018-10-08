import React, { Component } from 'react';
import './Survey.css';
import Back from './Back/Back';
import Unit from './Unit/Unit';
import Section from './Section/Section';
import FRQ from './FRQ/FRQ';
import MC from './MC/MC';
import Star from './Star/Star';

const questions = [
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

function displayQuestions(blocks) {
  const aList = [];
  for (let i = 0; i < blocks.length; i += 1) {
    const b = blocks[i];
    if (b[0] === 'unit') {
      aList.push(
        <div className="unit-container">
          <Unit name={b[1]} />
        </div>
      );
    } else if (b[0] === 'section') {
      aList.push(
        <div className="section-container">
          <Section name={b[1]} />
        </div>
      );
    } else if (b[0] === 'frq') {
      aList.push(
        <div className="frq-container">
          <FRQ question={b[1]} />
        </div>
      );
    } else if (b[0] === 'mc') {
      aList.push(
        <div className="mc-container">
          <MC question={b[1]} answers={b[2]} />
        </div>
      );
    } else if (b[0] === 'star') {
      aList.push(
        <div className="star-container">
          <Star question={b[1]} />
        </div>
      );
    }
  }
  return aList;
}

class Survey extends Component {
  render() {
    return (
      <section className="Survey">
        <div className="back-container">
          <Back />
        </div>
        {displayQuestions(questions)}
      </section>
    );
  }
}

export default Survey;
