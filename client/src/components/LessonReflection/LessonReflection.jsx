import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import './LessonReflection.css';
import Logout from '../Logout/Logout';

/** Currently Unit ID is hardcoded to 1, should be fetched from API in future versions  */

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
      teachNotes: {}
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
      .then(response => {
        const { notes } = response;
        this.setState({
          teachNotes: notes,
          url: `https://s3.us-east-2.amazonaws.com/ygnacio-lessons/${lessonID}.pdf`
        });
      });
  }

  handleEditorChange = event => {
    let { teachNotes } = this.state;
    teachNotes = event.target.getContent();
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
    data.append('notes', teachNotes);
    fetch(`/api/update/${parseInt(lessonID, 10)}`, {
      method: 'PUT',
      body: data
    });
  }

  render() {
    const { teachNotes, url } = this.state;
    console.log(url);
    return (
      <div>
        <Logout />
        <button
          type="button"
          className="ReturnArrow moveRight"
          onClick={this.handleGoBack}
        >
          &#8592; Return to Lessons
        </button>
        <p className="my-classes">My Lesson</p>
        <div className="lesson-container">
          <embed className="lesson" src={url} type="application/pdf" />
        </div>
        <div className="editor-container">
          <Editor
            initialValue={teachNotes}
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
