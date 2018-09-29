import React from 'react';
import './MC.css';

function displayAnswers(answers) {
  let aList = [];
  for (let i = 0; i < answers.length; i++) {
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
    return (
      <div className="mc">
        <div className="question">
          {this.props.question}
        </div>
        {displayAnswers(this.props.answers)}
      </div>
    );
  }
}

export default MC;
