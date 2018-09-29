import React from 'react';
import './MC.css';

class MC extends React.Component {
  render() {
    return (
      <div className="mc">
        {this.props.question}
        <input className="c" type="radio" name="mc" /> {this.props.a}
        <input className="c" type="radio" name="mc" /> {this.props.b}
        <input className="c" type="radio" name="mc" /> {this.props.c}
        <input className="c" type="radio" name="mc" /> {this.props.d}
      </div>
    );
  }
}

export default MC;
