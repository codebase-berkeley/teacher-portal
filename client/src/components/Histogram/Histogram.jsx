import React, { Component } from 'react';
import ReactChartkick, { ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

ReactChartkick.addAdapter(Chart);

export default class Histogram extends Component {
  render() {
    const { info, xlabel, ylabel } = this.props;
    return (
      <div className="histogram">
        <ColumnChart data={info} xtitle={xlabel} ytitle={ylabel} />
      </div>
    );
  }
}

Histogram.propTypes = {
  info: PropTypes.arrayOf(Array).isRequired,
  xlabel: PropTypes.string.isRequired,
  ylabel: PropTypes.string.isRequired
};
