import React from 'react';
import './Section.css';
import PropTypes from 'prop-types';

class Section extends React.Component {
  render() {
    const { name } = this.props;
    return <div className="section">{name}</div>;
  }
}

Section.propTypes = {
  name: PropTypes.string
};

Section.defaultProps = {
  name: null
};

export default Section;
