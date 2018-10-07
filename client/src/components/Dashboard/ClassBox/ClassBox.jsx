import React, { Component } from 'react';
import './ClassBox.css';
import { NavLink } from 'react-router-dom';

class ClassBox extends Component {
  render() {
    return (
      <NavLink className="classbox" to="/units">
        <div className={this.props.color + ' top-bar'} />
        <p className="title-p">{this.props.title}</p>
        <p className="teacher-p">{this.props.teacher}</p>
      </NavLink>
    );
  }
}

export default ClassBox;
