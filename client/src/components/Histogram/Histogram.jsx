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
      columnCharts: [],
      questions: []
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
        const charts = [];
        const xlabel = 'Question';
        const ylabel = 'Average Star Rating';
        jsonResponse.forEach(e => {
          charts.push(
            <div>
              <h2 className="questionTitle">{e.year}</h2>
              <ColumnChart data={e.questions} xtitle={xlabel} ytitle={ylabel} />
            </div>
          );
        });
        this.setState({ columnCharts: charts });
      });
    // fetch(`api/`)
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
        <table className="legend">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </table>
        {columnCharts}
      </div>
    );
  }
}
