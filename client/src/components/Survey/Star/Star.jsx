import React from 'react';
import './Star.css';
import PropTypes from 'prop-types';

class Star extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <div className="star">
        {question}

        <div className="container">
          <div className="demo">
            <div className="ratingControl">
              <label
                className="ratingControl-stars ratingControl-stars--5"
                htmlFor="rating-5"
              >
                <input type="radio" id="rating-5" name="rating" value="5" />
                5.0
              </label>
              <label
                className="ratingControl-stars ratingControl-stars--45 ratingControl-stars--half"
                htmlFor="rating-45"
              >
                <input type="radio" id="rating-45" name="rating" value="4.5" />
                4.5
              </label>
              <label
                className="ratingControl-stars ratingControl-stars--4"
                htmlFor="rating-4"
              >
                <input type="radio" id="rating-4" name="rating" value="4" />
                4.0
              </label>
              <label
                className="ratingControl-stars ratingControl-stars--35 ratingControl-stars--half"
                htmlFor="rating-35"
              >
                <input type="radio" id="rating-35" name="rating" value="3.5" />
                3.5
              </label>
              <label
                className="ratingControl-stars ratingControl-stars--3"
                htmlFor="rating-3"
              >
                <input type="radio" id="rating-3" name="rating" value="3" />
                3.0
              </label>
              <label
                className="ratingControl-stars ratingControl-stars--25 ratingControl-stars--half"
                htmlFor="rating-25"
              >
                <input type="radio" id="rating-25" name="rating" value="2.5" />
                2.5
              </label>
              <label
                className="ratingControl-stars ratingControl-stars--2"
                htmlFor="rating-2"
              >
                <input type="radio" id="rating-2" name="rating" value="2" />
                2.0
              </label>
              <label
                className="ratingControl-stars ratingControl-stars--15 ratingControl-stars--half"
                htmlFor="rating-15"
              >
                <input type="radio" id="rating-15" name="rating" value="1.5" />
                1.5
              </label>
              <label
                className="ratingControl-stars ratingControl-stars--1"
                htmlFor="rating-1"
              >
                <input type="radio" id="rating-1" name="rating" value="1" />
                1.0
              </label>
              <input type="radio" id="rating-05" name="rating" value="0.5" />
              <label
                className="ratingControl-stars ratingControl-stars--05 ratingControl-stars--half"
                htmlFor="rating-05"
              >
                05
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Star.propTypes = {
  question: PropTypes.string.isRequired
};

export default Star;
