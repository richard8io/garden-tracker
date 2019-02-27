import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BedNotFound from './BedNotFound';
import { handleAjaxError } from '../../helpers/helpers';
import Clock from '../Clock';
import { isEmptyObject, validateBed } from '../../helpers/helpers';
import Sectors from '../Sectors';
import SectorForm from '../Sectors/SectorForm';

class Bed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bed: null,
      activeSector: null,
      errors: {},
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSectorClick = this.handleSectorClick.bind(this);
  }

  componentWillReceiveProps({ bed }) {
    this.setState({ bed });
  }  

  handleClick(e) {
    e.preventDefault();
    const { bed } = this.state;
    const errors = validateBed(bed);
  
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      // const { onSubmit } = this.props;
      // onSubmit(bed);
      this.setState({ bed });
    }
  }

  handleSectorClick(id) {
    // TODO: Use the API to load a real record.
    const sector = {
      name: 'Skip',
      row: id,
      column: id
    };

    this.setState({activeSector: sector});
  }

  render() {
    const { bed, activeSector } = this.state;
    const { path } = this.props;

    if (!bed) return <BedNotFound />;
    if (!bed.id && path === '/beds/:id/edit') return <BedNotFound />;

    const stamp = {date: new Date()};
  
    return (
      <div className="eventContainer">
        <div className="beds-wrapper">
          <div className="bed-box">
            <b>{stamp.date.toLocaleTimeString()}.</b>
            <h2>
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
            <button className="delete" type="button" onClick={this.handleClick}>
             Test
            </button>
            <Sectors bed={bed} bedID={bed.id} onClick={this.handleSectorClick} />
          </div>
          <div className="bed-box">
            <SectorForm sector={activeSector} />
          </div>
        </div>
      </div>
    );
  }
}

Bed.propTypes = {
  bed: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired
};

Bed.defaultProps = {
  bed: undefined
};

export default Bed;