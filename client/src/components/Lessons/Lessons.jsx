import React, { Component } from 'react';
import LessonBox from './LessonBox/LessonBox';
import AddLessonBox from './AddLessonBox/AddLessonBox';
import './Lessons.css';

const topBar = 'top-bar';
const colors = ['yellow', 'aqua', 'dark-teal'];

class Lessons extends Component {
  state = { lessons: [] };

  componentDidMount() {
    fetch('http://localhost:8080/api/lessons/3') // 'https://untitled-hsryadifzuic.runkit.sh/api/lessons/3'
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
        <p className="my-lessons">My Lessons</p>
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
