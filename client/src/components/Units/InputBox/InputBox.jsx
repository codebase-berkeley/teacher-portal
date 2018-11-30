import React, { Component } from 'react';
import './InputBox.css';
import PropTypes from 'prop-types';

class InputBox extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { handler, id } = this.props;
    handler(id, event.target.value);
  }

  render() {
    const { id, input } = this.props;
    return (
      <div className="unitQuestions">
        <label htmlFor="QuestionOne">{`Question ${id}`}</label>
        <input
          type="text"
          id="inputText"
          className="inputText"
          onChange={this.handleChange}
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
