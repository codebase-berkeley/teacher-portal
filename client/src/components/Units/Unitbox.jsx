import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Unitbox.css';

class Unitbox extends Component {
  static propTypes = {
    unitName: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    buttonType: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  render() {
    const { unitName, path, buttonType, id } = this.props;
    const route = `${path}/${id}`;

    return (
      <div className="bars">
        <NavLink to={route} className={buttonType}>
          <div>{unitName}</div>
        </NavLink>
      </div>
    );
  }
}

export default Unitbox;
