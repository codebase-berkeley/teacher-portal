/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import LessonBox from './LessonBox/LessonBox';
import AddLessonBox from './AddLessonBox/AddLessonBox';
import AddLessonModal from './Modal/AddLessonModal';
import './Lessons.css';

const topBar = 'top-bar';
const colors = ['yellow', 'aqua', 'dark-teal'];

class Lessons extends Component {
  constructor() {
    super();
    this.state = {
      lessons: [],
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateLessons = this.updateLessons.bind(this);
  }

  componentDidMount() {
    fetch('/api/lessons/1')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed');
      })
      .then(lessons => {
        this.setState({ lessons });
      });
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
    return (
      <div className="lessons-container">
        <NavLink to="/units" className="Return">
          &#8592; Return to Units
        </NavLink>
        <p className="my-lessons">My Lessons</p>
        <NavLink to="/studentsummary" className="student-summary-button">
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
          />
        </Modal>
      </div>
    );
  }
}

export default Lessons;
