import Histogram from 'react-chart-histogram';
import React, { Component } from 'react';

export default class BarChart extends Component {
  render() {
    const { labels, data, options } = this.props;
    return (
      <div>
        <Histogram
          xLabels={labels}
          yValues={data}
          width='400'
          height='200'
          options={options}
        />
      </div>
    );
  }
}

// BarChart.propTypes = {
//   labels: propTypes.
// }