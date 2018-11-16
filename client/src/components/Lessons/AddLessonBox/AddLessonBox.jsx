import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddLessonBox.css';
import plus from './plsImage.png';

class AddLessonBox extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div
        className="lessonbox"
        onClick={onClick}
        onKeyDown={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex={0}
      >
        <div className="grey-top" />
        <img src={plus} className="plus-img" alt="plus" />
        <p className="add-new">Add new lesson</p>
      </div>
    );
  }
}

AddLessonBox.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default AddLessonBox;
