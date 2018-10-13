import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Cell.css';

class Cell extends Component {
  static propTypes = {
    response: PropTypes.string.isRequired
  };

  render() {
    const { response } = this.props;
    return <div className="cell">{response}</div>;
  }
}

export default Cell;
