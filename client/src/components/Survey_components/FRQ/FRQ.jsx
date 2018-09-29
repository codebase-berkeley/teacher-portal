import React from 'react';
import './FRQ.css';

class FRQ extends React.Component {
  render() {
    return (
      <div className="frq">
        <div className="question">
          {this.props.question}
        </div>
        <textarea className="answer" placeholder="Type your answer here..." />
      </div>
    );
  }
}

export default FRQ;
