import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './LessonReflection.css';

import lesson from './lesson.pdf';

class LessonReflection extends Component {
  handleEditorChange = e => {
    console.log('Content was updated:', e.target.getContent());
  };

  render() {
    return (
      <div>
        <div className="lesson-container">
          <embed className="lesson" src={lesson} type="application/pdf" />
        </div>
        <div className="editor-container">
          <Editor
            initialValue="<p>Type reflection here...</p>"
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
