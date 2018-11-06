import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import LessonBox from './LessonBox/LessonBox';
import AddLessonBox from './AddLessonBox/AddLessonBox';
import AddLessonModal from './AddLessonModal/AddLessonModal';
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
  }

  componentDidMount() {
    fetch('/api/lessons/3')
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
              title={less.name}
              color={`${colors[2 - Math.floor(Math.random() * 3)]} ${topBar}`}
            />
          ))}
        </div>
        <Modal isOpen={showModal} className="Modal" overlayClassName="Overlay">
          <AddLessonModal handleCloseModal={this.handleCloseModal} />
        </Modal>
      </div>
    );
  }
}

export default Lessons;
