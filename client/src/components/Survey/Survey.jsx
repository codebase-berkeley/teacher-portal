import React, { Component } from 'react';
import '../Survey_components/Logout/Logout.css';
import './Survey.css';
import Back from '../Survey_components/Back/Back';
import Logout from '../Survey_components/Logout/Logout';
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
        <div className="engage">
          <Section name="Student Engagement" />
        </div>

        <div className="FRQ">
          <FRQ question="What parts stand out to you as memorable and interesting?" />
        </div>

        <div className="MC">
          <MC a="Riveting textual engagement" b="Fascinating character dialogue" c="GOod" d="Kinky" />
        </div>

        <div className="Star">
          <Star question="HOW NTEIRNEIONFGOIN DID YOU NOFIN DINFTHISO unit" />
        </div>

      </div>
    );
  }
}

export default Survey;