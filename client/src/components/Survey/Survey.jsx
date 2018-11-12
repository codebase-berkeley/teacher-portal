import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Survey.css';
import Star from './Star/Star';

class Survey extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
    this.displayQuestions = this.displayQuestions.bind(this);
  }

  componentDidMount() {
    fetch('/api/questions')
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
    questions.forEach(q => {
      qlist.push(
        <div className="star-container">
          <Star question={q} />
        </div>
      );
    });
    return qlist;
  }

  render() {
    return (
      <section className="Survey">
        <div className="back-container">
          <NavLink to="/" className="Return">
            &#8592; Return to Classes
          </NavLink>
        </div>
        <div className="Questions">{this.displayQuestions()}</div>
      </section>
    );
  }
}

export default Survey;
