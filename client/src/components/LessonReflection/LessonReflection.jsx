import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import './LessonReflection.css';
import Logout from '../Logout/Logout';

/** Currently Unit ID is hardcoded to 1, should be fetched from API in future versions  */
const unitID = 1;

class LessonReflection extends Component {
  static propTypes = {
    match: PropTypes.string,
    history: PropTypes.string.isRequired
  };

  static defaultProps = {
    match: {}
  };

  constructor() {
    super();
    this.state = {
      teachNotes: {},
      filepath: null
    };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.saveText = this.saveText.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { lessonID } = match.params;
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

    fetch(`/api/lessons/${unitID}`)
      .then(response => response.json())
      .then(response => {
        const fr = response.filter(
          element => element.id === parseInt(lessonID, 10)
        )[0];
        this.setState({
          filepath: fr.filepath.slice(1)
        });
      });
  }

  handleEditorChange = event => {
    const { teachNotes } = this.state;
    teachNotes.notes = event.target.getContent();
    this.setState({ teachNotes });
  };

  handleGoBack() {
    const { history } = this.props;
    history.goBack();
  }

  saveText() {
    const { teachNotes } = this.state;
    const { match } = this.props;
    const { lessonID } = match.params;
    const data = new FormData();
    data.append('notes', teachNotes.notes);
    fetch(`/api/update/${parseInt(lessonID, 10)}`, {
      method: 'PUT',
      body: data
    });
  }

  render() {
    const { teachNotes, filepath } = this.state;
    const pathway = `http://localhost:8080${filepath}`;
    return (
      <div>
        <Logout />
        <button
          type="button"
          className="ReturnArrow Push"
          onClick={this.handleGoBack}
        >
          &#8592; Return to Lessons
        </button>
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
              plugins: 'link image code textcolor colorpicker autosave save',
              toolbar:
                'undo redo | fontsizeselect | bold italic | forecolor backcolor | alignleft aligncenter alignright | code | image | save',
              save_onsavecallback: this.saveText
            }}
            onChange={this.handleEditorChange}
          />
        </div>
      </div>
    );
  }
}

export default LessonReflection;
