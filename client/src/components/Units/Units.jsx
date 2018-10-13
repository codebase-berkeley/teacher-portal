import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Unitbox from './Unitbox';
import './Units.css';

const unitBoxes = [];
const unitNames = [
  'House on Mango Street',
  'Macbeth',
  "Harry Potter and Sahana's Eyebrow",
  "Harry Potter and the Gas Smell in Abhi's Apartment",
  "Harry Potter and Lang's Third Nipple"
];
function create() {
  for (let i = 0; i < unitNames.length; i += 1) {
    unitBoxes.push(<Unitbox unitName={unitNames[i]} />);
  }
}

create();
class Units extends Component {
  render() {
    return (
      <div className="Page-layout">
        <NavLink to="/" className="Return">
          &#8592; Return to Classes
        </NavLink>
        <h2 className="Unit-header">My Units</h2>
        <div>{unitBoxes}</div>
      </div>
    );
  }
}

export default Units;
