import React from 'react';
import './MC.css';

function displayAnswers(answers) {
  let aList = [];
  for (let i = 0; i < answers.length; i += 1) {
    aList.push(
      <div className="c">
        <input type="radio" name="mc" />
        {answers[i]}
      </div>
    );
  }
  return aList;
}

class MC extends React.Component {
  render() {
    return (
      <div className="mc">
        {this.props.question}
        {
          displayAnswers(
            this.props.answers
          )
        }
      </div>
    );
  }
}

export default MC;
