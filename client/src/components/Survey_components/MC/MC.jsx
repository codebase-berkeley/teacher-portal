import React from 'react';
import './MC.css';

class MC extends React.Component {
  render() {
    return (
      <div className="mc">
        {this.props.question}
        <br />
        <input type="radio" name="mc" /> {this.props.a}
        <br />
        <input type="radio" name="mc" /> {this.props.b}
        <br />
        <input type="radio" name="mc" /> {this.props.c}
        <br />
        <input type="radio" name="mc" /> {this.props.d}
        <br />
      </div>
    );
  }
}

export default MC;
