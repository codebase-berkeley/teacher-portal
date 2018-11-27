import React, { Component } from 'react';
import './InputBox.css';
import PropTypes from 'prop-types';

class InputBox extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired
  };

  render() {
    const { id, input } = this.props;
    return (
      <div className="question">
        <label htmlFor="QuestionOne">{`Question ${id}`}</label>
        <input
          type="text"
          className="inputText"
          onKeyUp={e => {
            if (e.keyCode === 13 && e.shiftKey === false) {
              e.preventDefault();
            }
          }}
        />
      </div>
    );
  }
}

export default InputBox;
