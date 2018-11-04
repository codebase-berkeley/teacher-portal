import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import request from 'superagent';
import { NavLink } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import './LessonReflection.css';

import lesson from './lesson.pdf';

class LessonReflection extends Component {
  state = { teachNotes: {} };

  componentDidMount() {
    fetch('/api/teacherNotes/1')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed');
      })
      .then(notes => {
        this.setState({ teachNotes: notes });
      });
  }

  onDrop = files => {
    // POST to a test endpoint for   demo purposes
    const req = request.post('https://httpbin.org/post');

    files.forEach(file => {
      req.attach(file.name, file);
    });

    req.end();
  };

  render() {
    const { teachNotes } = this.state;
    return (
      <div>
        <NavLink to="/lessons" className="Return">
          &#8592; Return to Lessons
        </NavLink>
        <p className="my-classes">My Lesson</p>
        <ReactDropzone onDrop={this.onDrop}>
          Drop your best gator GIFs here!!
        </ReactDropzone>
        <div className="lesson-container">
          <embed className="lesson" src={lesson} type="application/pdf" />
        </div>
        <div className="editor-container">
          <Editor
            initialValue={teachNotes.notes}
            init={{
              width: '600',
              height: '100vh',
              plugins: 'link image code textcolor colorpicker autosave',
              toolbar:
                'undo redo | fontsizeselect | bold italic | forecolor backcolor | alignleft aligncenter alignright | code | image'
            }}
            onChange={this.handleEditorChange}
          />
        </div>
      </div>
    );
  }
}

export default LessonReflection;
