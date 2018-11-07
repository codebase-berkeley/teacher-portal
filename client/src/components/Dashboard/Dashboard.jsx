import React, { Component } from 'react';
import ClassBox from './ClassBox/ClassBox';
import AddClassBox from './AddClassBox/AddClassBox';
import StudentModal from '../Modal/StudentModal';
import './Dashboard.css';

const topBar = 'top-bar';

function displayClassBoxes(classList) {
  const boxArray = [];
  for (let i = 0; i < classList.length; i += 1) {
    const str = `${classList[i].color} ${topBar}`;
    boxArray.push(
      <ClassBox
        title={classList[i].name}
        id={classList[i].id}
        key={classList[i].id}
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
      classList: []
    };
  }

  async componentWillMount() {
    const classes = await fetch('/api/classes');
    const classesJSON = await classes.json();
    this.setState({
      classList: classesJSON
    });
  }

  render() {
    const { classList } = this.state;
    return (
      <div className="dashboard-container">
        <StudentModal className="add-students" />
        <p className="my-classes">My Classes</p>
        <div className="boxes-container">
          <AddClassBox />
          {displayClassBoxes(classList)}
        </div>
      </div>
    );
  }
}

export default Dashboard;
