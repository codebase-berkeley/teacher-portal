import React, { Component } from 'react';
import ReactChartkick, { ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const info = [
  ['0.5', 230],
  ['1', 300],
  ['1.5', 100],
  ['2', 90],
  ['2.5', 50],
  ['3', 42],
  ['3.5', 32],
  ['4', 12],
  ['4.5', 14],
  ['5', 3]
];

const xlabel = 'Stars';

const ylabel = 'Number of Votes';

export default class Histogram extends Component {
  render() {
    return (
      <div className="histogram">
        <ColumnChart data={info} xtitle={xlabel} ytitle={ylabel} />
      </div>
    );
  }
}
