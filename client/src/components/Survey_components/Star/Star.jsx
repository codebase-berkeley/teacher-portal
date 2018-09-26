import React from 'react';
import './Star.css';

class Star extends React.Component {
  render(){
    return (
      <div className="Star">
        {this.props.question} 
        <br />
        *****
      </div>
      );
  }
}

export default Star;