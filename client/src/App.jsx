import React, { Component } from 'react';
import BarChart from './components/BarChart/BarChart';
import './App.css';

const LABELS = ['5', '4.5', '4', '3.5', '3', '2.5', '2', '1.5', '1', '0.5', '0'];

const DATA = [3, 14, 12, 32, 42, 50, 90, 100, 300, 230, 900];

const OPTIONS = { fillColor: 'blue', strokeColor: 'blue' };

class App extends Component {
  render() {
    return (
      <BarChart data={DATA} labels={LABELS} options={OPTIONS} />
    );
  }
}

export default App;
