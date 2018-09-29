import React from 'react';
import './Star.css';

className Star extends React.Component {
  render() {
    return (
      <div classNameName="star">
        {this.props.question}
        <!-- An interactive CSS star rating component.

Has hover and selected states, and could be integrated into a form very easily (as underneath the visual styling it is just radio buttons).  Size and margin between the stars can be easily changed by amending the sass variables.

No JS, all CSS and HTML.

Works on IE9>, Chrome, Firefox, Safari
-->

<div className="container">

          <h1>Interactive Star Rating Component (CSS Only) <a href="https://twitter.com/AshNolan_" target="blank">created by @AshNolan_</a></h1>

          <div className="demo">
            <div className="ratingControl">
              <input type="radio" id="rating-5" name="rating" value="5">
                <label className="ratingControl-stars ratingControl-stars--5" for="rating-5">5</label>
                <input type="radio" id="rating-45" name="rating" value="4.5">
                  <label className="ratingControl-stars ratingControl-stars--45 ratingControl-stars--half" for="rating-45">45</label>
                  <input type="radio" id="rating-4" name="rating" value="4">
                    <label className="ratingControl-stars ratingControl-stars--4" for="rating-4">4</label>
                    <input type="radio" id="rating-35" name="rating" value="3.5">
                      <label className="ratingControl-stars ratingControl-stars--35 ratingControl-stars--half" for="rating-35">35</label>
                      <input type="radio" id="rating-3" name="rating" value="3">
                        <label className="ratingControl-stars ratingControl-stars--3" for="rating-3">3</label>
                        <input type="radio" id="rating-25" name="rating" value="2.5">
                          <label className="ratingControl-stars ratingControl-stars--25 ratingControl-stars--half" for="rating-25">25</label>
                          <input type="radio" id="rating-2" name="rating" value="2">
                            <label className="ratingControl-stars ratingControl-stars--2" for="rating-2">2</label>
                            <input type="radio" id="rating-15" name="rating" value="1.5">
                              <label className="ratingControl-stars ratingControl-stars--15 ratingControl-stars--half" for="rating-15">15</label>
                              <input type="radio" id="rating-1" name="rating" value="1">
                                <label className="ratingControl-stars ratingControl-stars--1" for="rating-1">1</label>
                                <input type="radio" id="rating-05" name="rating" value="0.5">
                                  <label className="ratingControl-stars ratingControl-stars--05 ratingControl-stars--half" for="rating-05">05</label>
    </div>
  </div>
</div>
</div>
    );
  }
}

export default Star;
