import React from 'react';
import './Unit.css';

class Unit extends React.Component {
  render(){
    return (
      <div className="unit">
        {this.props.name}
      </div>
      );
  }
}

export default Unit;