import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Unitbox from './Unitbox';
import './Units.css';

// const url = window.location.href;
// const id = url[url.length - 1];
// const path = `/api/units/${id}`;
let unitBoxes = [];

function create(unitNames) {
  unitBoxes = [];
  for (let i = 0; i < unitNames.length; i += 1) {
    unitBoxes.push(<Unitbox unitName={unitNames[i].name} />);
  }
  return unitBoxes;
}

class Units extends Component {
  constructor() {
    super();
    this.state = {
      unitList: [{ name: 'lmao' }]
    };
  }

  componentDidMount() {
    fetch('/api/units/2')
      .then(response => response.json())
      .then(response => {
        this.setState({ unitList: response });
      });
  }

  render() {
    const { unitList } = this.state;
    return (
      <div className="Page-layout">
        <NavLink to="/" className="Return">
          &#8592; Return to Classes
        </NavLink>
        <h2 className="Unit-header">My Units</h2>
        <div>{create(unitList)}</div>
      </div>
    );
  }
}

export default Units;
