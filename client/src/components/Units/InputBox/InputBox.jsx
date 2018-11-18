import React, { Component } from 'react';
import './InputBox.css';
import PropTypes from 'prop-types';

class InputBox extends Component {
  static propTypes = {
    keynumber: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired
  };

  render() {
    const { keynumber, input } = this.props;

    return (
      <div className="question">
        <label htmlFor="QuestionOne">{`Question ${keynumber}`}</label>
        <input type="text" className="inputText" placeholder={input} />
      </div>
    );
  }
}

export default InputBox;
