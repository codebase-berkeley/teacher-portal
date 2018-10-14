import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Unitbox.css';

class Unitbox extends Component {
  static propTypes = {
    unitName: PropTypes.string.isRequired
  };

  render() {
    const { unitName } = this.props;
    return (
      <div>
        <NavLink to="/survey" className="link">
          <div>{unitName}</div>
        </NavLink>
      </div>
    );
  }
}

export default Unitbox;
