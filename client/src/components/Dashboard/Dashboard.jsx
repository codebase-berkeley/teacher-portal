import React, { Component } from 'react';
import ClassBox from './ClassBox/ClassBox';
import AddClassBox from './AddClassBox/AddClassBox';
import './Dashboard.css';

// const colors = ['yellow', 'aqua', 'dark-teal'];
const topBar = 'top-bar';

function displayClassBoxes(classList) {
  const boxArray = [];
  for (let i = 0; i < classList.length; i += 1) {
    // const color = colors[2 - Math.floor(Math.random() * 3)];
    const str = `${classList[i].color} ${topBar}`;
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

  async componentWillMount() {
    const res = await fetch('/api/classes');
    const json = await res.json();
    this.setState({
      classList: json
    });
  }

  render() {
    const { classList } = this.state;
    return (
      <div className="dashboard-container">
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
