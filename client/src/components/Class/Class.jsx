import React, { Component } from 'react';
import './Class.css';

class Class extends Component {
  render() {
    return (
      <body>
        <div className="welcome">
          <h2>Welcome!</h2>
          <h3>Get started here.</h3>
          <form>
            <input type="text" placeholder="Email" />
            <br />
            <input type="password" placeholder="Password" />
          </form>
        </div>
      </body>
    );
  }
}

export default Class;
