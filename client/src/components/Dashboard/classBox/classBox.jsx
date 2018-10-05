import React, { Component } from 'react';
import './classBox.css';

class ClassBox extends Component {
  render() {
    return (
      <div className="classbox">
        <div className="topBar" />
        <p className="title-p">{this.props.title}</p>
        <p className="teacher-p">{this.props.teacher}</p>
      </div>
    );
  }
}

export default ClassBox;
