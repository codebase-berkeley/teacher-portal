/* eslint-disable no-alert */
import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import plus from '../AddLessonBox/plsImage.png';
import './AddLessonModal.css';

/* key of the file being uploaded */
const key = 'sampleFile';

/* styles for react drop zone */
const customStyles = {
  background: '#f4f4f4',
  width: '100%',
  marginTop: '30px',
  paddingBottom: '10px',
  height: 'auto',
  border: '3px solid #EBE9E9',
  cursor: 'pointer'
};

const activeStyle = {
  background: '#EBE9E9'
};

function onDropRejected() {
  alert('Upload PDFs only.');
}

class AddLessonModal extends Component {
  constructor() {
    super();
    this.state = {
      currfile: null
    };
    this.okClicked = this.okClicked.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop = files => {
    files.forEach(file => {
      this.setState({
        currfile: file
      });
    });
  };

  okClicked() {
    const { handleCloseModal } = this.props;
    const lessonName = document.getElementById('input-id').value;
    if (!lessonName) {
      alert('Please enter a lesson name.');
    } else {
      const { currfile } = this.state;
      if (!currfile) {
        alert('Please upload a file.');
      } else {
        const data = new FormData();
        data.append(key, currfile);
        data.append('name', lessonName);
        fetch('/api/upload', { method: 'POST', body: data });
        handleCloseModal();
      }
    }
  }

  render() {
    const { handleCloseModal } = this.props;

    return (
      <div className="lesson-modal">
        <div className="top-bar top-modal" />
        <form className="contents">
          <h2 className="bad-code">Add New lesson</h2>
          <p>Lesson Name</p>
          <input
            type="text"
            name="lessonName"
            id="input-id"
            className="lesson_input"
          />
          <ReactDropzone
            style={customStyles}
            activeStyle={activeStyle}
            accept=".pdf"
            onDrop={this.onDrop}
            onDropRejected={onDropRejected}
            multiple={false}
            inputProps={{ name: key }}
          >
            {({ acceptedFiles }) => {
              if (acceptedFiles.length) {
                return <p>{acceptedFiles[0].name}</p>;
              }
              return (
                <div>
                  <img src={plus} className="plus-img" alt="plus" />
                  <p className="insert_lesson">Insert Lesson PDF</p>
                  <p className="small_lesson">* PDFs only</p>
                </div>
              );
            }}
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
