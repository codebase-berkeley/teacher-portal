import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Unitbox from './Unitbox';
import './Units.css';

let unitBoxes = [];
let unitNames = [
  'House on Mango Street',
  'Macbeth',
  "Harry Potter and Sahana's Eyebrow",
  "Harry Potter and the Gas Smell in Abhi's Apartment",
  "Harry Potter and Lang's Third Nipple"
];
let unitNavs = [];
function create(unitNames) {
  for (let i = 0; i < unitNames.length; i++) {
    unitBoxes.push(<Unitbox unitName={unitNames[i]} />);
  }
}
function wrap(unitBoxes) {
  for (let i = 0; i < unitBoxes.length; i++) {
    unitNavs.push(<NavLink to="/survey">{unitBoxes[i]}</NavLink>);
  }
}

create(unitNames);
wrap(unitBoxes);
class Units extends Component {
  render() {
    return (
      <div className="Page-layout">
        <NavLink to="/" className="Return">
          &#8592; Return to Classes
        </NavLink>
        <h2 className="Unit-header">My Units</h2>
        <div>{unitNavs}</div>
      </div>
    );
  }
}

export default Units;
