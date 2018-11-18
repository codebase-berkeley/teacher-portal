import React, { Component } from 'react';
import ClassBox from './ClassBox/ClassBox';
import Logout from '../Logout/Logout';
import AddClassBox from './AddClassBox/AddClassBox';
import './Dashboard.css';

const topBar = 'top-bar';

function displayClassBoxes(classList) {
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
    const { history } = this.props;
    const classRoute = await fetch('/api/getUsers', { redirect: 'follow' });
    if (classRoute.redirected) {
      history.push('/login');
      return;
    }

    fetch('/api/getUsers')
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        },
        networkError => console.log(networkError.message)
      )
      .then(jsonResponse => {
        const id = jsonResponse;
        fetch(`/api/classes/${id}`).then(
          async classes => {
            if (classes.ok) {
              const classesJSON = await classes.json();
              this.setState({ classList: classesJSON });
              return classes;
            }
            throw new Error('Request failed!');
          },
          networkError => console.log(networkError.message)
        );
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
