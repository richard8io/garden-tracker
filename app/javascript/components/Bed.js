import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BedNotFound from './BedNotFound';
import { handleAjaxError } from '../helpers/helpers';

class Sectors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sectors: null,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/sectors.json?bed_id=${16}`)
      .then(response => this.setState({ sectors: response.data }))
      .catch(handleAjaxError);
  }

  renderBoxes() {
    const { sectors } = this.state;
    if (sectors == null) return null;

    var rows = [];
    {this.state.sectors.map((item, key) =>
      rows.push(<div className="box" key={item.id}>{item.id}</div>)
    )}
    return rows;
  }

  render () {
    const { bed } = this.props;
    
    if (bed === null) return null;
    
    return (
      <div className={`wrapper${bed.rows}`}>
        {this.renderBoxes()}
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
