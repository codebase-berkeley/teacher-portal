import React, { Component } from 'react';
import './AddLessonBox.css';
import plus from './plusImage.png';

class AddLessonBox extends Component {
  render() {
    return (
      <div className="lessonbox">
        <div className="grey-top" />
        <img src={plus} className="plus-img" alt="plus" />
        <p className="add-new">Add new class</p>
      </div>
    );
  }
}

export default AddLessonBox;
