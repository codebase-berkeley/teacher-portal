import React, { Component } from 'react';
import ClassBox from './ClassBox/ClassBox';
import AddClassBox from './AddClassBox/AddClassBox';
import './Dashboard.css';

const teachers = ['Teacher', 'Teacher', 'Teacher', 'Teacher', 'Teacher'];
const colors = ['yellow', 'aqua', 'dark-teal'];
const topBar = 'top-bar';

function displayClassBoxes(teachersArr, classList) {
  const boxArray = [];
  for (let i = 0; i < classList.length; i += 1) {
    const color = colors[2 - Math.floor(Math.random() * 3)];
    const str = `${color} ${topBar}`;
    boxArray.push(
      <ClassBox
        title={classList[i].name}
        id={classList[i].id}
        teacher={classList[i].teacher}
        color={str}
      />
    );
  }
  return boxArray;
}

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      classList: ['hello']
    };
  }

  componentDidMount() {
    fetch('https://untitled-066tu6l1dpyf.runkit.sh/api/classes')
      .then(response => response.json())
      .then(response => {
        this.setState({ classList: response });
      });
  }

  render() {
    return (
      <div className="dashboard-container">
        <p className="my-classes">My Classes</p>
        <div className="boxes-container">
          <AddClassBox />
          {displayClassBoxes(teachers, this.state.classList)}
        </div>
      </div>
    );
  }
}

export default Dashboard;
