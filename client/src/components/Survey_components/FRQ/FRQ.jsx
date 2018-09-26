import React from 'react';
import './FRQ.css';

class FRQ extends React.Component {
  render(){
    return (
      <div className="FRQ">
        {this.props.question}
        <input type="text" placeholder="Type your answer here..."/>
      </div>
      );
  }
}

export default FRQ;