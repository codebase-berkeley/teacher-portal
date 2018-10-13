import React, { Component } from 'react';
import ReactChartkick, { PieChart } from 'react-chartkick';
import Chart from 'chart.js';
import './CircleChart.css';

ReactChartkick.addAdapter(Chart);

class CircleChart extends Component {
  render() {
    return (
      <div>
        <h2 className="question"> How did you find this text?</h2>
        <div className="chart">
          <PieChart
            data={[['Blueberry', 44], ['Strawberry', 23]]}
            legend="right"
            width="650px"
          />
        </div>
      </div>
    );
  }
}

export default CircleChart;
