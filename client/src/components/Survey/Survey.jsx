import React, { Component } from 'react';
import '../Logout/Logout.css';
import './Survey.css';
import Back from '../Survey_components/Back/Back';
import Logout from '../Logout/Logout';
import Unit from '../Survey_components/Unit/Unit';
import Section from '../Survey_components/Section/Section';
import FRQ from '../Survey_components/FRQ/FRQ';
import MC from '../Survey_components/MC/MC';
import Star from '../Survey_components/Star/Star';

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
      <div className="App">
        <div className="back-container">
          <Back />
        </div>
        <div className="logout-container">
          <Logout />
        </div>
        {displayQuestions(this.props.questions)}
      </div>
    );
  }
}

export default Survey;
