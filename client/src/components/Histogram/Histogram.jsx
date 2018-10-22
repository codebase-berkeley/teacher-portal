import React, { Component } from 'react';
import ReactChartkick, { ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
import './Histogram.css';

ReactChartkick.addAdapter(Chart);

export default class Histogram extends Component {
  constructor() {
    super();
    this.state = {
      columnCharts: []
    };
  }

  componentDidMount() {
    fetch('/api/studentSummary')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed!');
      })
      .then(jsonResponse => {
        const questions = ['q1', 'q2', 'q3', 'q4'];
        const titles = ['Question 1', 'Question 2', 'Question 3', 'Question 4'];
        const charts = [];
        const xlabel = 'Years';
        const ylabel = 'Average Star Rating';
        for (let i = 0; i < questions.length; i += 1) {
          const arr = [];
          for (let j = 0; j < jsonResponse.length; j += 1) {
            arr.push([jsonResponse[j].year, jsonResponse[j][questions[i]]]);
          }
          charts.push(
            <div>
              <h2 className="questionTitle">{titles[i]}</h2>
              <ColumnChart data={arr} xtitle={xlabel} ytitle={ylabel} />
            </div>
          );
        }
        this.setState({ columnCharts: charts });
      });
  }

  render() {
    const { columnCharts } = this.state;
    return (
      <div className="histogram">
        <h1 className="title">Student Summary</h1>
        {columnCharts}
      </div>
    );
  }
}
