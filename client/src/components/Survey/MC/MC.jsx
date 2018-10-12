import React from 'react';
import './MC.css';
import PropTypes from 'prop-types';

function displayAnswers(answers) {
  const aList = [];
  let name = 'mc';
  let num = '';
  for (let i = 0; i < answers.length; i += 1) {
    num = toString(i);
    name += num;
    aList.push(
      <label htmlFor={name} className="container">
        <input id={name} type="radio" name="mc" />
        <span className="checkmark" />
        {answers[i]}
      </label>
    );
  }
  return aList;
}

class MC extends React.Component {
  render() {
    const { question, answers } = this.props;
    return (
      <div className="mc">
        <div className="question">{question}</div>
        {displayAnswers(answers)}
      </div>
    );
  }
}

MC.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(String).isRequired
};

export default MC;
