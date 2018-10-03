import React from 'react';
import './MC.css';
import PropTypes from 'prop-types';

function displayAnswers(answers) {
  const aList = [];
  for (let i = 0; i < answers.length; i += 1) {
    aList.push(
      <label className="container">
        <input type="radio" name="mc" />
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
  question: PropTypes.string,
  answers: PropTypes.arrayOf(String)
};

MC.defaultProps = {
  question: null,
  answers: null
};

export default MC;
