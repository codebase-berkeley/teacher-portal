import React, { Component } from 'react';
import Logo from './ygnacio-valley-logo.jpg';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = { isTeacher: true };
    this.setStatus = this.setStatus.bind(this);
  }

  setStatus(bool) {
    const { isTeacher } = this.state;
    this.setState({ isTeacher: bool });

    fetch('/api/teacherBool', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isTeacher
      })
    }).then(
      response => {
        if (response.ok) {
          return response;
        }
        throw new Error('Request failed!');
      },
      networkError => console.log(networkError.message)
    );
  }

  render() {
    return (
      <div className="login-page">
        <div>
          <img src={Logo} alt="logo" className="logo" />
          <h1 className="welcome">Welcome!</h1>
          <div className="welcome-sub">Get started here.</div>
          <div className="button-wrapper">
            <a
              href="http://localhost:8080/auth/google/teacherStatus/0"
              className="signin"
              onClick={() => {
                this.setStatus(true);
              }}
            >
              Sign in as Student
            </a>
            <a
              href="http://localhost:8080/auth/google/teacherStatus/1"
              className="signin"
              onClick={() => {
                this.setStatus(false);
              }}
            >
              Sign in as Teacher
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
