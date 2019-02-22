import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserNotFound from './UserNotFound';

const User = ({ user, onDelete }) => {
  if (!user) return <UserNotFound />;

  return (
    <div className="eventContainer">
      <h2>
        {user.login}
        {' - '}
        {user.password}
        {' '}
        <Link to={`/users/${user.id}/edit`}>Edit</Link>
        <button className="delete" type="button" onClick={() => onDelete(user.id)}>
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Login:</strong>
          {' '}
          {user.login}
        </li>
        <li>
          <strong>Password:</strong>
          {' '}
          {user.password}
        </li>
      </ul>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired
};

User.defaultProps = {
  user: undefined
};

export default User;
