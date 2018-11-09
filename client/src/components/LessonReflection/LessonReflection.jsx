/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import './LessonReflection.css';

// import lesson from './lesson.pdf';

const unitID = 1;
const lessonID = 2;

class LessonReflection extends Component {
  state = {
    teachNotes: {}
    // filepath: null
  };

  componentDidMount() {
    fetch(`/api/teacherNotes/${lessonID}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed');
      })
      .then(notes => {
        this.setState({ teachNotes: notes });
      });
    fetch(`api/lessons/${unitID}`)
      .then(response => response.json())
      .then(response => {
        const fr = response.filter(element => element.id === lessonID)[0];
        this.setState({
          filepath: fr.filepath.slice(1)
        });
      });
  }

  render() {
    const { teachNotes, filepath } = this.state;
    const pathway = `http://localhost:8080${filepath}`;
    return (
      <div>
        <NavLink to="/lessons" className="Return">
          &#8592; Return to Lessons
        </NavLink>
        <p className="my-classes">My Lesson</p>
        <div className="lesson-container">
          <embed className="lesson" src={pathway} type="application/pdf" />
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
