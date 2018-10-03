import React from 'react';
import './FRQ.css';
import PropTypes from 'prop-types';

class FRQ extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <div className="frq">
        <div className="question">{question}</div>
        <textarea className="answer" placeholder="Type your answer here..." />
      </div>
    );
  }
}

FRQ.propTypes = {
  question: PropTypes.string
};

FRQ.defaultProps = {
  question: null
};

export default FRQ;
