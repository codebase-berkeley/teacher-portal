import React from 'react';
import './MC.css';

// function writeChoices (choices) {
//   for (let i = 0; i < choices.length; i++) {
//     <input type="radio" name="MC" /> <script>choices[i]</script>
//   }
// }

class MC extends React.Component {
  render() {
    return (
      <div className="MC">
        {this.props.question}
        {/* 
        {
          writeChoices(this.props.choices)
        } */}
        <br />
        <input type="radio" name="MC" /> {this.props.a}
        <br />
        <input type="radio" name="MC" /> {this.props.b}
        <br />
        <input type="radio" name="MC" /> {this.props.c}
        <br />
        <input type="radio" name="MC" /> {this.props.d}
        <br />
      </div>
    );
  }
}

export default MC;
