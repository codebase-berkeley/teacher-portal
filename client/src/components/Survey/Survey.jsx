import React, { Component } from 'react';
import '../Logout/Logout.css';
import './Survey.css';
import Back from '../Survey_components/Back/Back';
import Logout from '../Logout/Logout';
import Unit from '../Survey_components/Unit/Unit';
import Section from '../Survey_components/Section/Section';
import FRQ from '../Survey_components/FRQ/FRQ';
import MC from '../Survey_components/MC/MC';
import Star from '../Survey_components/Star/Star';

class Survey extends Component {
  render() {
    return (
      <div className="App">
        <div className="back-container">
          <Back />
        </div>
        <div className="logout-container">
          <Logout />
        </div>
        <div className="unit-container">
          <Unit name="Macbeth" />
        </div>
        <div className="section-container">
          <Section name="Student Engagement" />
        </div>

        <div className="star-container">
          <Star question="How interesting did you find this unit" />
        </div>

        <div className="frq-container">
          <FRQ question="What parts stand out to you as memorable and interesting?" />
        </div>

        <div className="frq-container">
          <FRQ question="What parts of the unit did you find less interesting??" />
        </div>

        <div className="section-container">
          <Section name="Unit Relevance" />
        </div>

        <div className="star-container">
          <Star question="on a scale of 1-5" />
        </div>

        <div className="mc-container">
          <MC
            question="Which of the following reasons was the reason you enjoyed this unit?"
            answers={[
              "Riveting textual engagement",
              "Fascinating character dialogue",
              "Good",
              "Kinky"
            ]}
          />
        </div>

        <div className="frq-container">
          <FRQ question="What aspects of the unit may need some work?" />
        </div>
      </div>
    );
  }
}

export default Survey;
