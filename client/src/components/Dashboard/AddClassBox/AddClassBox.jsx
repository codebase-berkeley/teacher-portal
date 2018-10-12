import React, { Component } from 'react';
import './AddClassBox.css';
import plus from './plusImage.png';

class AddClassBox extends Component {
  render() {
    return (
      <div className="classbox">
        <div className="grey-top" />
        <img src={plus} className="plus-img" alt="plus" />
        <p className="add-new">Add new class</p>
      </div>
    );
  }
}

export default AddClassBox;
