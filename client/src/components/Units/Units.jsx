import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Unitbox from './Unitbox';
import './Units.css';

let unitBoxes = [];

function create(unitNames) {
  unitBoxes = [];
  unitBoxes.push(
    <Unitbox unitName="+ Add New Unit" path="null" buttonType="add" />
  );
  for (let i = 0; i < unitNames.length; i += 1) {
    unitBoxes.push(
      <Unitbox unitName={unitNames[i].name} path="/lessons" buttonType="link" />
    );
  }
  return unitBoxes;
}

class Units extends Component {
  constructor() {
    super();
    this.state = {
      unitList: []
    };
  }

  async componentWillMount() {
    const units = await fetch('/api/units/1');
    const unitsJSON = await units.json();
    this.setState({
      unitList: unitsJSON
    });
  }

  render() {
    const { unitList } = this.state;
    return (
      <div className="Page-layout">
        <NavLink to="/" className="ReturnArrow">
          &#8592; Return to Classes
        </NavLink>
        <h2 className="Unit-header">My Units</h2>
        <div>{create(unitList)}</div>
      </div>
    );
  }
}

export default Units;
