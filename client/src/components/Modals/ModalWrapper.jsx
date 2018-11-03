import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalWrapper.css';

class ModalWrapper extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const { title } = this.props;
    return (
      <div className="container">
        <h2 className="title">{title}</h2>
        <form>
          <input type="text" placeholder="Unit Name" className="input-box" />
          <input
            type="password"
            placeholder="Unit Name"
            className="input-box"
          />
        </form>
        <button className="button" type="submit">
          Cancel
        </button>
        <button className="button" type="submit">
          Add
        </button>
      </div>
    );
  }
}

export default ModalWrapper;
