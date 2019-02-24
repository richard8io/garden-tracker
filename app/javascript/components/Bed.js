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
    for (var i = 1; i <= bed.columns; i++) {
      rows.push(<td><Link to={`/sectors/1?bed_id=${bed.id}&row=${rowID}&column=${i}`}><div className="sector">cell-{rowID}-{i}</div></Link></td>);
    }
    return rows;
  }

  renderRows(bed) {
    var rows = [];
    for (var i = 1; i <= bed.rows; i++) {
      // rows.push(<tr>{this.renderRow(bed, i)}</tr>);
      rows.push(<tr key="a{i}"><td key="x{i}">{i}</td></tr>);
    }
    return rows;
  }

  // render() {
  //   var rows = [];
  //   rows.push(<table><tbody>{this.renderRows(bed)}</tbody></table>);
  //   return rows;
  // }
  render () {
    const { bed } = this.props;
    if (bed === null) return null;
    return (
      <div className={`wrapper${bed.rows}`}>
        <div className="box">{bed.rows}</div>
        <div className="box">2</div>
        <div className="box">3</div>
        <div className="box">4</div>
        <div className="box">5</div>
        <div className="box">6</div>
        <div className="box">7</div>
        <div className="box">8</div>
        <div className="box">9</div>
        <div className="box">10</div>
        <div className="box">11</div>
        <div className="box">12</div>
        <div className="box">13</div>
        <div className="box">14</div>
      </div>
    );
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
