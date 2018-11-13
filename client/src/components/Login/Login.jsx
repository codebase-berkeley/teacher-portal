import React, { Component } from 'react';
import Logo from './ygnacio-valley-logo.jpg';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div>
          <img src={Logo} alt="logo" className="logo" />
          <h1 className="welcome">Welcome!</h1>
          <div className="welcome-sub">Get started here.</div>
          <div className="button-wrapper">
            <a href="/" className="signin">
              Sign in as Student
            </a>
            <a href="/" className="signin">
              Sign in as Teacher
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
