import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserNotFound from './UserNotFound';

const Bed = ({ bed, onDelete }) => {
  if (!bed) return <UserNotFound />;

  return (
    <div className="eventContainer">
      <h2>
        {bed.name}
        <Link to={`/beds/${bed.id}/edit`}>Edit</Link>
        <button className="delete" type="button" onClick={() => onDelete(bed.id)}>
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Name:</strong>
          {' '}
          {bed.name}
        </li>
      </ul>
    </div>
  );
};

Bed.propTypes = {
  bed: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired
};

Bed.defaultProps = {
  bed: undefined
};

export default Bed;
