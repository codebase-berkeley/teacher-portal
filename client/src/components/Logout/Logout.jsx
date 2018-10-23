import React from 'react';
import './Logout.css';

function Logout() {
  return (
    <a href="/auth/logout/" className="logout">
      Logout
    </a>
  );
}

export default Logout;
