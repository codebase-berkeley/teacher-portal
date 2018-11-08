import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render() {
    const { text } = this.props;
    return <li>{text}</li>;
  }
}

export default Item;
