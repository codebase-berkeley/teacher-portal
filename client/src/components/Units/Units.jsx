import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Unitbox from './Unitbox';
import './Units.css';

class Units extends Component {
  render() {
    return (
      <div className="Page-layout">
        {/* <a className="Return" href="#">
          &#8592; Return to Classes
        </a> */}
        <NavLink to="/classes" className="Return">
          &#8592; Return to Classes
        </NavLink>
        <h2 className="Unit-header">My Units</h2>
        <div className="Unit-titles">
          <Unitbox unitName="House on Mango Street" />
          <Unitbox unitName="Macbeth" />
          <Unitbox unitName="Harry Potter and Sahana's Eyebrow" />
          <Unitbox unitName="Harry Potter and the Gas Smell in Abhi's Apartment" />
          <Unitbox unitName="Harry Potter and Lang's Third Nipple" />
        </div>
      </div>
    );
  }
}

export default Units;
