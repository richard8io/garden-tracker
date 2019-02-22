import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventNotFound from './EventNotFound';

const Event = ({ event, onDelete }) => {
  if (!event) return <EventNotFound />;

  return (
    <div className="eventContainer">
      <h2>
        {event.login}
        {' - '}
        {event.password}
        {' '}
        <Link to={`/users/${event.id}/edit`}>Edit</Link>
        <button className="delete" type="button" onClick={() => onDelete(event.id)}>
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Login:</strong>
          {' '}
          {event.login}
        </li>
        <li>
          <strong>Password:</strong>
          {' '}
          {event.password}
        </li>
      </ul>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Event.defaultProps = {
  event: undefined,
};

export default Event;
