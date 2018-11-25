import React from 'react';
import './Star.css';
import PropTypes from 'prop-types';

class Star extends React.Component {
  render() {
    const { question, number } = this.props;
    const name = `rating${number}`;
    return (
      <div className="star">
        {question}

        <div className="stars">
          <div className="rating">
            <div className="question">
              <input
                className="form-radio"
                type="radio"
                id="rating-5"
                name={name}
                value="5"
              />
              <label htmlFor="rating-5">5</label>
            </div>
            <div className="question">
              <input
                className="form-radio"
                type="radio"
                id="rating-4"
                name={name}
                value="4"
              />
              <label htmlFor="rating-4">4</label>
            </div>
            <div className="question">
              <input
                className="form-radio"
                type="radio"
                id="rating-3"
                name={name}
                value="3"
              />
              <label htmlFor="rating-3">3</label>
            </div>

            <div className="question">
              <input
                className="form-radio"
                type="radio"
                id="rating-2"
                name={name}
                value="2"
              />
              <label htmlFor="rating-2">2</label>
            </div>
            <div className="question">
              <input
                className="form-radio"
                type="radio"
                id="rating-1"
                name={name}
                value="1"
              />
              <label htmlFor="rating-1">1</label>
            </div>
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
