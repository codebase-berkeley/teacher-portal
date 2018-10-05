import React, { Component } from 'react';
import ClassBox from './classBox/classBox';
import AddClassBox from './addClassBox/addClassBox';
import './Dashboard.css';

let classes = [
  'one weird ass class name here',
  'another weird ass class name here',
  'one last weird ass class name here'
];

let teachers = ['Teacher 1', 'Teacher 2', 'Teacher 3'];

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <p className="myClasses">My Classes</p>
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
    boxArray.push(<ClassBox title={classes[i]} teacher={teachers[i]} />);
  }
  return boxArray;
}

export default Dashboard;
