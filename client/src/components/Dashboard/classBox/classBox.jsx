import React, { Component } from 'react';
import './ClassBox.css';

class ClassBox extends Component {
  render() {
    return (
      <div className="classbox">
        <div className={this.props.color + ' top-bar'} />
        <p className="title-p">{this.props.title}</p>
        <p className="teacher-p">{this.props.teacher}</p>
      </div>
    );
  }
}

export default ClassBox;
