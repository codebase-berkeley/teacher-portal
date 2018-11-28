import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Survey.css';
import Star from './Star/Star';

/** TOOD: hard-coded for now, someone fix this later */
const unitID = 1;

class Survey extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
    this.displayQuestions = this.displayQuestions.bind(this);
  }

  componentDidMount() {
    fetch(`/api/questions/${unitID}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          questions: response
        });
      });
  }

  displayQuestions() {
    const { questions } = this.state;
    const qlist = [];
    questions.forEach((q, index) => {
      qlist.push(
        <div className="star-container">
          <Star number={index} question={q} />
        </div>
      );
    });
    return qlist;
  }

  render() {
    const route = `/api/survey/${unitID}`;
    return (
      <section className="Survey">
        <div className="back-container">
          <NavLink to="/" className="Return">
            &#8592; Return to Classes
          </NavLink>
        </div>
        <form method="POST" action={route} className="Questions">
          {this.displayQuestions()}
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
}

export default Survey;
