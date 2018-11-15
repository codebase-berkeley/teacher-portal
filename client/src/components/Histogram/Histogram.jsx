import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactChartkick, { ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
import './Histogram.css';

const unitID = 1;

ReactChartkick.addAdapter(Chart);

export default class Histogram extends Component {
  static propTypes = {
    history: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      columnCharts: []
    };

    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    fetch(`/api/studentSummary/${unitID}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed!');
      })
      .then(jsonResponse => {
        const { num } = jsonResponse[0];
        const charts = [];
        const xlabel = 'Years';
        const ylabel = 'Average Star Rating';
        for (let i = 0; i < num; i += 1) {
          const arr = [];
          for (let j = 0; j < jsonResponse.length; j += 1) {
            arr.push([jsonResponse[j].year, jsonResponse[j].questions[i]]);
          }
          charts.push(
            <div>
              <h2 className="questionTitle">{`Question ${i + 1}`}</h2>
              <ColumnChart data={arr} xtitle={xlabel} ytitle={ylabel} />
            </div>
          );
        }
        this.setState({ columnCharts: charts });
      });
  }

  handleGoBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { columnCharts } = this.state;
    return (
      <div className="histogram">
        <button type="button" className="Return" onClick={this.handleGoBack}>
          &#8592; Return to Lessons
        </button>
        <h1 className="title">Student Summary</h1>
        {columnCharts}
      </div>
    );
  }
}
