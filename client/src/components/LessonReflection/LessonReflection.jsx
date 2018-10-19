import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './LessonReflection.css';

import lesson from './lesson.pdf';

class LessonReflection extends Component {
  componentDidMount() {
    fetch('http://localhost:8080/api/teacherNotes/1')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed');
      })
      .then(TeachNotes => {
        this.setState({ TeachNotes });
      });
  }

  handleEditorChange = e => {
    console.log('Content was updated:', e.target.getContent());
  };

  render() {
    return (
      <div>
        <p className="my-classes">My Lesson</p>
        <div className="lesson-container">
          <embed className="lesson" src={lesson} type="application/pdf" />
        </div>
        <div className="editor-container">
          <Editor
            initialValue={this.state.TeachNotes[0].notes}
            init={{
              width: '600',
              plugins: 'link image code',
              toolbar:
                'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={this.handleEditorChange}
          />
        </div>
      </div>
    );
  }
}

export default LessonReflection;
