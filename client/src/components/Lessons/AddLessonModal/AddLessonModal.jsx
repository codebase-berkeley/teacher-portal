import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import plus from '../AddLessonBox/plsImage.png';
import './AddLessonModal.css';

const customStyles = {
  background: '#eee',
  width: '100%',
  'margin-top': '30px',
  'padding-bottom': '10px',
  height: 'auto',
  border: '1px solid #d6d6d6',
  'border-radius': '3px'
};

class AddLessonModal extends Component {
  render() {
    const { handleCloseModal } = this.props;
    return (
      <div className="lesson-modal">
        <div className="top-bar top-modal" />
        <div className="contents">
          <h1 className="bad-code">Add New lesson</h1>
          <p>Lesson Name</p>
          <input type="text" name="lessonName" className="lesson_input" />
          <ReactDropzone style={customStyles}>
            <div>
              <img src={plus} className="plus-img" alt="plus" />
              <p className="insert_lesson">Insert Lesson PDF</p>
            </div>
          </ReactDropzone>
          <div className="modal_buttons">
            <button
              type="button"
              className="m_button"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="m_button"
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddLessonModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired
};

export default AddLessonModal;
