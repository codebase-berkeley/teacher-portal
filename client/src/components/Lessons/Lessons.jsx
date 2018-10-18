import React, { Component } from 'react';
import LessonBox from './LessonBox/LessonBox';
import AddLessonBox from './AddLessonBox/AddLessonBox';
import './Lessons.css';

const topBar = 'top-bar';
const colors = ['yellow', 'aqua', 'dark-teal'];

class Lessons extends Component {
  state = { lessons: [] };

  componentDidMount() {
    fetch('https://untitled-hsryadifzuic.runkit.sh/api/lessons/3') // 'https//portal.bch.ee/lessons/:unitID'
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
    const color = colors[2 - Math.floor(Math.random() * 3)];
    const str = `${color} ${topBar}`;
    return (
      <div className="lessons-container">
        <p className="my-lessons">My Lessons</p>
        <div className="box-container">
          <AddLessonBox />
          {this.state.lessons.map(lessons => (
            <LessonBox title={lessons.name} color={str} />
          ))}
        </div>
      </div>
    );
  }
}

export default Lessons;
