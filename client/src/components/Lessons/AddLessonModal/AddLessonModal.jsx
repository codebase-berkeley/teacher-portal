import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import request from 'superagent';
import PropTypes from 'prop-types';
import plus from '../AddLessonBox/plsImage.png';
import './AddLessonModal.css';

const customStyles = {
  background: '#eee',
  width: '100%',
  marginTop: '30px',
  paddingBottom: '10px',
  height: 'auto',
  border: '1px solid #d6d6d6',
  borderRadius: '3px',
  cursor: 'pointer'
};

class AddLessonModal extends Component {
  constructor() {
    super();
    this.okClicked = this.okClicked.bind(this);
  }

  onDrop = files => {
    console.log('ONDROP');
    // POST to a test endpoint for demo purposes
    const req = request.post('https://httpbin.org/post');
    files.forEach(file => {
      req.attach(file.name, file);
    });
    req.end();
  };

  okClicked() {
    const { handleCloseModal } = this.props;
    const lessonName = document.getElementById('input-id').value;
    if (!lessonName) {
      alert('Please enter a lesson name.');
    } else {
      handleCloseModal();
    }
  }

  render() {
    const { handleCloseModal } = this.props;

    return (
      <div className="lesson-modal">
        <div className="top-bar top-modal" />
        <form className="contents">
          <h1 className="bad-code">Add New lesson</h1>
          <p>Lesson Name</p>
          <input
            type="text"
            name="lessonName"
            id="input-id"
            className="lesson_input"
          />
          <ReactDropzone style={customStyles} onDrop={this.onDrop}>
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
            <button type="button" className="m_button" onClick={this.okClicked}>
              OK
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddLessonModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired
};

export default AddLessonModal;
