import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Garden Tracker</h1>
    <Link to="/users/index">Users</Link>
    <Link to="/beds/index">Beds</Link>
  </header>
);

export default Header;