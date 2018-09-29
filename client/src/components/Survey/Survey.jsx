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
        <div className="back">
          <Back />
        </div>
        <div className="logout-container">
          <Logout />
        </div>
        <div className="unit-container">
          <Unit name="Macbeth" />
        </div>
        <div className="engage">
          <Section name="Student Engagement" />
        </div>

        <div className="Star">
          <Star question="HOW NTEIRNEIONFGOIN DID YOU NOFIN DINFTHISO unit" />
        </div>

        <div className="FRQ">
          <FRQ question="What parts stand out to you as memorable and interesting?" />
        </div>

        <div className="FRQ">
          <FRQ question="What parts of the unit did you find less interesting??" />
        </div>

        <div className="engage">
          <Section name="Unit Relevance" />
        </div>

        <div className="Star">
          <Star question="on a scale of 1-5" />
        </div>

        <div className="MC">
          <MC
            question="huh"
            a="Riveting textual engagement"
            b="Fascinating character dialogue"
            c="GOod"
            d="Kinky"
          />
        </div>

        <div className="FRQ">
          <FRQ question="What aspects of the unit may need some work?" />
        </div>
      </div>
    );
  }
}

export default Survey;
