import React, { Component } from 'react';
import ClassBox from './ClassBox/ClassBox';
import Logout from '../Logout/Logout';
import AddClassBox from './AddClassBox/AddClassBox';
import './Dashboard.css';

const topBar = 'top-bar';

function displayClassBoxes(classList) {
  console.log(classList);
  const boxArray = [];
  for (let i = 0; i < classList.length; i += 1) {
    const str = `${classList[i].color} ${topBar}`;
    boxArray.push(
      <ClassBox
        title={classList[i].class_name}
        id={classList[i].classid}
        key={classList[i].classid}
        teacher={`${classList[i].first_name} ${classList[i].last_name}`}
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
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  async componentWillMount() {
    const classes = await fetch('/api/classes');
    const classesJSON = await classes.json();
    // console.log(classesJSON);
    this.setState({
      classList: classesJSON
    });
  }

  render() {
    const { classList } = this.state;
    return (
      <div className="dashboard-container">
        <Logout />
        <p className="my-classes">My Classes</p>
        <div className="boxes-container">
          <AddClassBox
            reRender={this.componentWillMount}
            classList={classList}
          />
          {displayClassBoxes(classList)}
        </div>
      </div>
    );
  }
}

export default Dashboard;
