import React, { Component } from 'react';
import './ClassBox.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class ClassBox extends Component {
  static propTypes = {
    reRender: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  constructor() {
    super();
    this.deleteClass = this.deleteClass.bind(this);
  }

  deleteClass() {
    const { title, reRender } = this.props;
    fetch(`/api/deleteClass/${title}`, {
      method: 'delete'
    }).then(response => {
      if (response.ok) {
        reRender();
        return response.json();
      }
      throw new Error('Request Failed');
    });
  }

  render() {
    const { color, title, teacher, id } = this.props;
    const route = `/units/${id}`;

    return (
      <div className="class-container">
        <button className="exit" type="button" onClick={this.deleteClass}>
          &#10005;
        </button>
        <NavLink className="classbox" to={route}>
          <div className={color} />
          <p className="title-p">{title}</p>
          <p className="teacher-p">{teacher}</p>
        </NavLink>
      </div>
    );
  }
}

export default ClassBox;
