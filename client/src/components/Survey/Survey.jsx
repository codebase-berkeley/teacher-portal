import React, { Component } from 'react';
import './Logout/Logout.css';
import './Survey.css';
import PropTypes from 'prop-types';
import Back from './Back/Back';
import Logout from './Logout/Logout';
import Unit from './Unit/Unit';
import Section from './Section/Section';
import FRQ from './FRQ/FRQ';
import MC from './MC/MC';
import Star from './Star/Star';

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
    const { questions } = this.props;
    return (
      <section className="Survey">
        <div className="back-container">
          <Back />
        </div>
        <div className="logout-container">
          <Logout />
        </div>
        {displayQuestions(questions)}
      </section>
    );
  }
}

Survey.propTypes = {
  questions: PropTypes.arrayOf(Array)
};

Survey.defaultProps = {
  questions: null
};

export default Survey;
