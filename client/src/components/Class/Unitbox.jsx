import React, { Component } from 'react';
import './Unitbox.css';

class Unitbox extends Component {
  render() {
    return (
      <body>
        <div className="Unit-dashboard">
          <p>this.props.unitName</p>
        </div>
      </body>
    );
  }
}

export default Unitbox;
