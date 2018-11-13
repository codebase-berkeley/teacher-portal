import React, { Component } from 'react';
import './ClassBox.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class ClassBox extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  render() {
    const { color, title, teacher, id } = this.props;
    const route = `/units/${id}`;

    return (
      <NavLink className="classbox" to={route}>
        <div className={color} />
        <p className="title-p">{title}</p>
        <p className="teacher-p">{teacher}</p>
      </NavLink>
    );
  }
}

export default ClassBox;
