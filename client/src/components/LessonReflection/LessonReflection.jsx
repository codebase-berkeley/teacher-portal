import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import './LessonReflection.css';

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
      .then(response => {
        const { notes, filepath } = response;
        console.log(`notes: ${notes}`);
        this.setState({ teachNotes: notes, filepath: filepath.slice(1) });
      });

    //   fetch(`/api/lessons/${unit}`)
    //     .then(response => response.json())
    //     .then(response => {
    //       const fr = response.filter(
    //         element => element.id === parseInt(lessonID, 10)
    //       )[0];
    //       this.setState({
    //         filepath: fr.filepath.slice(1)
    //       });
    //     });
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
    const { teachNotes, filepath } = this.state;
    console.log(`teachNotes: ${teachNotes}`);
    const pathway = `http://localhost:8080${filepath}`;
    return (
      <div>
        <button type="button" className="Return" onClick={this.handleGoBack}>
          &#8592; Return to Lessons
        </button>
        <p className="my-classes">My Lesson</p>
        <div className="lesson-container">
          <embed className="lesson" src={pathway} type="application/pdf" />
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
