import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Unitbox.css';

class Unitbox extends Component {
  static propTypes = {
    unitName: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    buttonType: PropTypes.string.isRequired
  };

  render() {
    const { unitName, path, buttonType } = this.props;
    return (
      <div className="bars">
        <NavLink to={path} className={buttonType}>
          <div>{unitName}</div>
        </NavLink>
      </div>
    );
  }
}

export default Unitbox;
