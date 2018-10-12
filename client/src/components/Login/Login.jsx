import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="welcome">
          <h2>Welcome!</h2>
          <h3>Get started here.</h3>
          <form>
            <input type="text" placeholder="Email" className="login-box" />
            <input
              type="password"
              placeholder="Password"
              className="login-box"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
