import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BedNotFound from './BedNotFound';

class Sectors extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRow(bed, rowID) {
    var rows = [];
    for (var i = 0; i < bed.columns; i++) {
      rows.push(<td>cell-{rowID}-{i}</td>);
    }
    return rows;
  }

  renderRows(bed) {
    var rows = [];
    for (var i = 0; i < bed.rows; i++) {
      rows.push(<tr>{this.renderRow(bed, i)}</tr>);
    }
    return rows;
  }

  render() {
    const { bed } = this.props;
    if (bed === null) return null;

    var rows = [];
    rows.push(<table>{this.renderRows(bed)}</table>);
    return rows;
  }
}

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

Sectors.propTypes = {
  bed: PropTypes.shape()
};

// Sectors.defaultProps = {
//   bed: undefined
// };

export default Bed;
