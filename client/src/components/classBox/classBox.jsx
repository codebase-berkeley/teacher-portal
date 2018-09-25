import React, { Component } from 'react';
import './classBox.css';

class ClassBox extends Component {
  render() {
    return (
      <div className="classbox">
        <h2>{this.props.title}</h2>
        <p>{this.props.teacher}</p>
      </div>
    );
  }
}

export default ClassBox;
