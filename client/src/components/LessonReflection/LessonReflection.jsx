import React, { Component } from 'react';
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

  render() {
    const s = this.state;
    const n = s.teachNotes;
    return (
      <div>
        <p className="my-classes">My Lesson</p>
        <div className="lesson-container">
          <embed className="lesson" src={lesson} type="application/pdf" />
        </div>
        <div className="editor-container">
          <Editor
            initialValue={n.notes}
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
