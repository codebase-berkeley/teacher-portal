import React, { Component } from 'react';
import ClassBox from './classBox/classBox';
import AddClassBox from './addClassBox/addClassBox';
import './Dashboard.css';

let classes = [
  'One Weird Ass Class Name Here',
  'Another Weird Ass Class Name Here',
  'One Last Weird Ass Class Name Here',
  'JUST KIDDING ANUTHA ONE YEET',
  'ANUTHA ONE ANUTHA ONE ANUTHA ONE ANUTHA ONE'
];

let teachers = ['Teacher', 'Teacher', 'Teacher', 'Teacher', 'Teacher'];
let colors = ['yellow', 'aqua', 'dark-teal'];

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <p className="my-classes">My Classes</p>
        <div className="boxes-container">
          <AddClassBox />
          {displayClassBoxes(classes, teachers)}
        </div>
      </div>
    );
  }
}

function displayClassBoxes(classes, teachers) {
  let boxArray = [];
  for (let i = 0; i < classes.length; i += 1) {
    let color = colors[2 - Math.floor(Math.random() * 3)];
    boxArray.push(
      <ClassBox title={classes[i]} teacher={teachers[i]} color={color} />
    );
  }
  return boxArray;
}

export default Dashboard;
