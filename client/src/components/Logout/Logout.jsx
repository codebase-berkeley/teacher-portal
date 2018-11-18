import React from 'react';
import './Logout.css';

function Logout() {
  return (
    <a href="http://localhost:8080/auth/logout/" className="logout">
      Logout
    </a>
  );
}

export default Logout;
