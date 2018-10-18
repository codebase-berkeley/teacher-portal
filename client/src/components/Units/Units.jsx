import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Unitbox from './Unitbox';
import './Units.css';

const url = window.location.href;
const id = url[url.length - 1];
const path = `https://untitled-066tu6l1dpyf.runkit.sh/api/units/${id}`;
let unitBoxes = [];

function create(unitNames) {
  unitBoxes = [];
  for (let i = 0; i < unitNames.length; i += 1) {
    unitBoxes.push(<Unitbox unitName={unitNames[i].name} />);
  }
}

class Units extends Component {
  constructor() {
    super();
    this.state = {
      unitList: []
    };
  }

  componentDidMount() {
    fetch(path)
      .then(response => response.json())
      .then(response => {
        this.setState({ unitList: response });
      });
  }

  render() {
    return (
      <div className="Page-layout">
        <NavLink to="/" className="Return">
          &#8592; Return to Classes
        </NavLink>
        <h2 className="Unit-header">My Units</h2>
        {create(this.state.unitList)}
        <div>{unitBoxes}</div>
      </div>
    );
  }
}

export default Units;
