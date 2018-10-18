import React, { Component } from 'react';
import LessonBox from './LessonBox/LessonBox';
import AddLessonBox from './AddLessonBox/AddLessonBox';
import './Lessons.css';

const topBar = 'top-bar';

// function displayLessonBoxes(lessonsArr, colorsArr) {
//   const boxArray = [];
//   for (let i = 0; i < lessonsArr.length; i += 1) {
//     const color = colorsArr[2 - Math.floor(Math.random() * 3)];
//     const str = `${color} ${topBar}`;
//     boxArray.push(<LessonBox title={lessonsArr[i]} color={str} />);
//   }
//   return boxArray;
// }

class Lessons extends Component {
  constructor() {
    super();
    this.lessonNames = [];
    this.colors = [];
    this.boxArray = [];
  }

  componentDidMount() {
    fetch('https://untitled-hsryadifzuic.runkit.sh/api/lessons/1') // 'https//portal.bch.ee/lessons/:unitID'
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed');
      })
      .then(jsonResponse => {
        for (let i = 0; i < jsonResponse.length; i += 1) {
          this.lessonNames.push(jsonResponse[i].name);
          this.colors.push(jsonResponse[i].color);
        }
        for (let i = 0; i < this.lessonNames.length; i += 1) {
          const color = this.colors[2 - Math.floor(Math.random() * 3)];
          const str = `${color} ${topBar}`;
          this.boxArray.push(
            <LessonBox title={this.lessonNames[i]} color={str} />
          );
        }
      });
  }

  // displayLessonBoxes() {
  //   const boxArray = [];
  //   for (let i = 0; i < this.lessonNames.length; i += 1) {
  //     const color = this.colors[2 - Math.floor(Math.random() * 3)];
  //     const str = `${color} ${topBar}`;
  //     boxArray.push(<LessonBox title={this.lessonNames[i]} color={str} />);
  //   }
  //   console.log(boxArray);
  //   return boxArray;
  // }

  render() {
    return (
      <div className="lessons-container">
        <p className="my-lessons">My Lessons</p>
        <div className="box-container">
          <AddLessonBox />
          {this.boxArray}
        </div>
      </div>
    );
  }
}

export default Lessons;
