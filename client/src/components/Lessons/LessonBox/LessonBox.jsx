import React, { Component } from 'react';
import './LessonBox.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class LessonBox extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  render() {
    const { title, color, id } = this.props;
    const link = `/reflections/${id}`;
    return (
      <NavLink className="lessonbox" to={link}>
        <div className={color} />
        <p className="title-p">{title}</p>
      </NavLink>
    );
  }
}

export default LessonBox;
