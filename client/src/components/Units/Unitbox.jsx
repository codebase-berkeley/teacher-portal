import React, { Component } from 'react';
import './Unitbox.css';

class Unitbox extends Component {
  render() {
    return (
      <div>
        <a className="links" href="#">
          {this.props.unitName}
        </a>
      </div>
    );
  }
}

export default Unitbox;
