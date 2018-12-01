import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Survey.css';
import Star from './Star/Star';

/** TOOD: hard-coded for now, someone fix this later */
const studentID = 9;

class Survey extends Component {
  static propTypes = {
    match: PropTypes.string.isRequired,
    history: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      questions: []
    };
    this.displayQuestions = this.displayQuestions.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { unitID } = match.params;
    fetch(`/api/questions/${unitID}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          questions: response
        });
      });
  }

  handleGoBack() {
    const { history } = this.props;
    history.goBack();
  }

  displayQuestions() {
    const { questions } = this.state;
    const qlist = [];
    questions.forEach(q => {
      qlist.push(
        <div className="star-container">
          <Star number={q.id} question={q.text} />
        </div>
      );
    });
    return qlist;
  }

  render() {
    const { match } = this.props;
    const { unitID } = match.params;
    const route = `/api/survey`;
    return (
      <section className="Survey">
        <div className="back-container">
          <button
            type="button"
            className="ReturnArrow moveRight"
            onClick={this.handleGoBack}
          >
            &#8592; Return to Units
          </button>
        </div>
        <form method="POST" action={route} className="Questions">
          {this.displayQuestions()}
          <input type="hidden" name="unitID" value={unitID} />
          <input type="hidden" name="studentID" value={studentID} />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </section>
    );
  }
}

export default Survey;
