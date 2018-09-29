import React, { Component } from 'react';
import './addClassBox.css';
import plus from './plusImage.png';

class AddClassBox extends Component {
  render() {
    return (
      <div className="classbox">
        <div className="topBarGrey" />
        <img src={plus} className="plusImage" alt="plus" />
        <p className="addNew">Add new class</p>
      </div>
    );
  }
}

export default AddClassBox;
