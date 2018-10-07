import React from 'react';
import './Back.css';
import { NavLink } from 'react-router-dom';

function Back() {
  return (
    <div>
      <NavLink to="/units">&#8592; Return to Units</NavLink>
    </div>
  );
}
export default Back;
