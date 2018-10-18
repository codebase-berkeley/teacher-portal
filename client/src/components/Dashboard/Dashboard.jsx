import React, { Component } from 'react';
import ClassBox from './ClassBox/ClassBox';
import AddClassBox from './AddClassBox/AddClassBox';
import './Dashboard.css';

const classes = [
  'One Weird Ass Class Name Here',
  'Another Weird Ass Class Name Here',
  'One Last Weird Ass Class Name Here',
  'JUST KIDDING ANUTHA ONE YEET',
  'ANUTHA ONE ANUTHA ONE ANUTHA ONE ANUTHA ONE'
];

const teachers = ['Teacher', 'Teacher', 'Teacher', 'Teacher', 'Teacher'];
const colors = ['yellow', 'aqua', 'dark-teal'];
const topBar = 'top-bar';

function displayClassBoxes(classesArr, teachersArr) {
  const boxArray = [];
  for (let i = 0; i < classesArr.length; i += 1) {
    const color = colors[2 - Math.floor(Math.random() * 3)];
    const str = `${color} ${topBar}`;
    boxArray.push(
      <ClassBox title={classesArr[i]} teacher={teachersArr[i]} color={str} />
    );
  }
  console.log(boxArray);
  return boxArray;
}

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

export default Dashboard;
