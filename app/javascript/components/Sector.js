import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import BedNotFound from './BedNotFound';

const Sector = ({ sector }) => {
  // if (!bed) return <BedNotFound />;

  return (
    <div className="eventContainer">
      <i>sector id = {sector.id}</i>
      {/* <h2>
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
        <li>
          <strong>Rows:</strong>
          {' '}
          {bed.rows}
        </li>
        <li>
          <strong>Columns:</strong>
          {' '}
          {bed.columns}
        </li>
      </ul>
      <Sectors bed={bed} /> */}
    </div>
  );
};

Sector.propTypes = {
  sector: PropTypes.shape(),
  // onDelete: PropTypes.func.isRequired
};

Sector.defaultProps = {
  sector: undefined
};

export default Sector;