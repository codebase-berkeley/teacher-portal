import React from 'react';
import './Unit.css';
import PropTypes from 'prop-types';

class Unit extends React.Component {
  render() {
    const { name } = this.props;
    return <div className="unit">{name}</div>;
  }
}

Unit.propTypes = {
  name: PropTypes.string
};

Unit.defaultProps = {
  name: null
};

export default Unit;
