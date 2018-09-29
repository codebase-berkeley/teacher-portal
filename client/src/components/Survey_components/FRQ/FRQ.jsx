import React from 'react';
import './FRQ.css';

class FRQ extends React.Component {
  render() {
    return (
      <div className="frq">
        {this.props.question}
        <textarea className="answer" placeholder="Type your answer here..." />
      </div>
    );
  }
}

export default FRQ;
