import React, { Component } from 'react';
import ClassBox from './ClassBox/ClassBox';
import Logout from '../Logout/Logout';
import AddClassBox from './AddClassBox/AddClassBox';
import './Dashboard.css';

const topBar = 'top-bar';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      classList: [],
      isTeacher: false
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.displayClassBoxes = this.displayClassBoxes.bind(this);
  }

  async componentWillMount() {
    const classRoute = await fetch('/api/classes', { redirect: 'follow' });
    if (classRoute.ok) {
      const classesJSON = await classRoute.json();
      this.setState({
        classList: classesJSON.query,
        isTeacher: classesJSON.is_teacher
      });
    }
    return classRoute;
  }

  displayClassBoxes(classList, isTeacher) {
    const boxArray = [];
    for (let i = 0; i < classList.length; i += 1) {
      const str = `${classList[i].color} ${topBar}`;
      boxArray.push(
        <ClassBox
          reRender={this.componentWillMount}
          title={classList[i].class_name}
          id={classList[i].classid}
          key={classList[i].classid}
          teacher={`${classList[i].first_name} ${classList[i].last_name}`}
          color={str}
          isTeacher={isTeacher}
        />
      );
    }
    return boxArray;
  }

  render() {
    const { classList, isTeacher } = this.state;
    return (
      <div className="dashboard-container">
        <Logout />
        <p className="my-classes">My Classes</p>
        <div className="boxes-container">
          {isTeacher ? (
            <AddClassBox
              reRender={this.componentWillMount}
              classList={classList}
            />
          ) : null}

          {this.displayClassBoxes(classList, isTeacher)}
        </div>
      </div>
    );
  }
}

export default Dashboard;
