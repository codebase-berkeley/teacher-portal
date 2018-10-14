import React, { Component } from 'react';
import './LessonBox.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class LessonBox extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const { color, title } = this.props;
    return (
      <NavLink className="lessonbox" to="/units">
        <div className={color} />
        <p className="title-p">{title}</p>
      </NavLink>
    );
  }
}

export default LessonBox;
