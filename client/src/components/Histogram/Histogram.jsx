import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactChartkick, { ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
import Logout from '../Logout/Logout';
import './Histogram.css';

ReactChartkick.addAdapter(Chart);

export default class Histogram extends Component {
  static propTypes = {
    history: PropTypes.string.isRequired,
    match: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = { columnCharts: [], questions: [] };

    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { unitID } = match.params;
    fetch(`/api/questions/${unitID}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed!');
      })
      .then(jsonResponse => {
        const rows = [];
        jsonResponse.forEach((e, i) => {
          rows.push(
            <tr>
              <td>{i + 1}</td>
              <td>{e.text}</td>
            </tr>
          );
        });
        const questionTable = (
          <table className="legend">
            <tr>
              <th>Question</th>
              <th>Text</th>
            </tr>
            {rows}
          </table>
        );
        this.setState({
          questions: questionTable
        });
      });
    fetch(`/api/studentSummary/${unitID}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed!');
      })
      .then(jsonResponse => {
        const { questions } = this.state;
        const charts = [];
        const xlabel = 'Question';
        const ylabel = 'Average Star Rating';
        jsonResponse.forEach(e => {
          charts.push(
            <div>
              <h2 className="questionTitle">{e.year}</h2>
              <ColumnChart data={e.questions} xtitle={xlabel} ytitle={ylabel} />
              <p>{questions}</p>
            </div>
          );
        });
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
        <Logout />
        <button type="button" className="Return" onClick={this.handleGoBack}>
          &#8592; Return to Lessons
        </button>
        <h1 className="title">Student Summary</h1>
        {columnCharts}
      </div>
    );
  }
}
