import React from 'react';
import './Star.css';

class Star extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <div className="star">
        { question }
        <br />
        *****
      </div>
    );
  }
}

export default Star;
