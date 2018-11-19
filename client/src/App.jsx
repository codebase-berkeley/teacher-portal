import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Survey from './components/Survey/Survey';
import Units from './components/Units/Units';
import Summary from './components/Histogram/Histogram';
import Lessons from './components/Lessons/Lessons';
import LessonReflection from './components/LessonReflection/LessonReflection';

import './App.css';

const hst = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={hst}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Dashboard} />
            <Route path="/units/:classID" component={Units} />
            <Route exact path="/survey" component={Survey} />
            <Route exact path="/studentsummary/:unitID" component={Summary} />
            <Route exact path="/lessons/:unitID" component={Lessons} />
            <Route path="/reflections/:lessonID" component={LessonReflection} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
