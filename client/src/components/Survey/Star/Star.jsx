import React from 'react';
import './Star.css';
import PropTypes from 'prop-types';

class Star extends React.Component {
  render() {
    const { question, number } = this.props;
    const name = `rating${number}`;
    return (
      <div className="question">
        <h1 className="question-text">{question}</h1>

        <div className="stars">
          <div className="star">
            <input
              className="form-radio"
              type="radio"
              id="rating-5"
              name={name}
              value="5"
            />
            <label className="rating" htmlFor="rating-5">
              5
            </label>
          </div>
          <div className="star">
            <input
              className="form-radio"
              type="radio"
              id="rating-4"
              name={name}
              value="4"
            />
            <label className="rating" htmlFor="rating-4">
              4
            </label>
          </div>
          <div className="star">
            <input
              className="form-radio"
              type="radio"
              id="rating-3"
              name={name}
              value="3"
            />
            <label className="rating" htmlFor="rating-3">
              3
            </label>
          </div>
          <div className="star">
            <input
              className="form-radio"
              type="radio"
              id="rating-2"
              name={name}
              value="2"
            />
            <label className="rating" htmlFor="rating-2">
              2
            </label>
          </div>
          <div className="star">
            <input
              className="form-radio"
              type="radio"
              id="rating-1"
              name={name}
              value="1"
            />
            <label className="rating" htmlFor="rating-1">
              1
            </label>
          </div>
        </div>
      </div>
    );
  }
}

Star.propTypes = {
  question: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default Star;
