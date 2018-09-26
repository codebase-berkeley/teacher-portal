import React from 'react';
import './Section.css';


class Section extends React.Component {
  render(){
    return (
      <div className="section">
        {this.props.name}
      </div>
      );
  }
}

export default Section;