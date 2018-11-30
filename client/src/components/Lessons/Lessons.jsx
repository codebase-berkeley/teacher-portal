import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import LessonBox from './LessonBox/LessonBox';
import AddLessonBox from './AddLessonBox/AddLessonBox';
import AddLessonModal from './Modal/AddLessonModal';
import Logout from '../Logout/Logout';
import './Lessons.css';

const topBar = 'top-bar';
const colors = ['yellow', 'aqua', 'dark-teal'];

class Lessons extends Component {
  static propTypes = {
    match: PropTypes.string.isRequired,
    history: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      lessons: [],
      showModal: false
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateLessons = this.updateLessons.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { unitID } = match.params;
    fetch(`/api/lessons/${unitID}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed');
      })
      .then(lessons => {
        this.setState({ lessons: lessons.query });
      });
  }

  handleGoBack() {
    const { history } = this.props;
    history.goBack();
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  updateLessons(lessonID, lessonName, color) {
    const { lessons } = this.state;
    lessons.push({ lesson_name: lessonName, color, id: lessonID });
    this.setState({ lessons });
  }

  render() {
    const { lessons, showModal } = this.state;
    const { match } = this.props;
    const { unitID } = match.params;
    return (
      <div className="lessons-container">
        <Logout />
        <button
          type="button"
          className="ReturnArrow moveRight"
          onClick={this.handleGoBack}
        >
          &#8592; Return to Units
        </button>
        <p className="my-lessons">My Lessons</p>
        <NavLink
          to={`/studentsummary/${unitID}`}
          className="student-summary-button"
        >
          Student Summary
        </NavLink>
        <div className="box-container">
          <AddLessonBox onClick={this.handleOpenModal} />
          {lessons.map(less => (
            <LessonBox
              title={less.lesson_name}
              color={`${colors[2 - Math.floor(Math.random() * 3)]} ${topBar}`}
              id={less.id}
              key={less.lesson_name}
              reRender={this.componentDidMount}
            />
          ))}
        </div>
        <Modal
          isOpen={showModal}
          className="LessonModal"
          overlayClassName="LessonOverlay"
        >
          <AddLessonModal
            handleOpenModal={this.handleOpenModal}
            handleCloseModal={this.handleCloseModal}
            updateLessons={this.updateLessons}
            unitID={unitID}
          />
        </Modal>
      </div>
    );
  }
}

export default Lessons;
