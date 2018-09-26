import React from 'react';
import './MC.css';

class MC extends React.Component {
  render(){
    return (
      <div className="MC">
        {this.props.question}
        <br />
        <input type="radio" name="MC" /> {this.props.a} 
        <br />
        <input type="radio" name="MC" /> {this.props.b} 
        <br />
        <input type="radio" name="MC" /> {this.props.c} 
        <br />
        <input type="radio" name="MC" /> {this.props.d} 
        <br />
      </div>
      );
  }
}

export default MC;