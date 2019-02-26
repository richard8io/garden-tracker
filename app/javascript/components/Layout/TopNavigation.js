import React from 'react';
import { Link } from 'react-router-dom';

const TopNavigation = () => (
  <div className="top-navigation">
    <div className="navigation-wrapper">
      <div className="navigation-box">
        <Link to="/users/index">Users</Link>
        <Link to="/beds/index">Beds</Link>
      </div>
      <div className="navigation-box"></div>
      <div className="navigation-box">
        <Link to="/login/new">Logout</Link>
      </div>
    </div>
  </div>
);

export default TopNavigation;