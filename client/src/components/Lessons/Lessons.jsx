import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LessonBox from './LessonBox/LessonBox';
import AddLessonBox from './AddLessonBox/AddLessonBox';
import './Lessons.css';

const topBar = 'top-bar';
const colors = ['yellow', 'aqua', 'dark-teal'];

class Lessons extends Component {
  state = { lessons: [] };

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

  render() {
    const s = this.state;
    const l = s.lessons;
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
          <AddLessonBox />
          {l.map(less => (
            <LessonBox
              title={less.name}
              color={`${colors[2 - Math.floor(Math.random() * 3)]} ${topBar}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Lessons;
