import React, { Component } from 'react';
import Unitbox from './Unitbox';
import './Class.css';

class Class extends Component {
  render() {
    return (
      <div className="Page-layout">
        <div className="Return">
          <h4>Return to Classes</h4>
        </div>
        <div className="Unit-header">
          <h2>My Units</h2>
        </div>
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

export default Class;
