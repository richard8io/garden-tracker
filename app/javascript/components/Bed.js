import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BedNotFound from './BedNotFound';

const Sectors = ({ bed }) => (
  // for (var i = 0; i < bed.rows; i++) {
  //   lines.push("<div className='sector-grid'>");
  //   for (var j = 0; j < bed.cols; j++) {
  //     lines.push("<div className='grid-area'>x</div>");
  //   }
  //   lines.push("<div>");
  // }
  <div className="sector-grid">
    <div className="grid-area">{bed.name}</div>
    <div className="grid-area">Two</div>
    <div className="grid-area">Three</div>
    <div className="grid-area">Four</div>
  </div>
);

const Bed = ({ bed, onDelete }) => {
  if (!bed) return <BedNotFound />;

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
      <Sectors bed={bed} />
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
