import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BedNotFound from './BedNotFound';
import { success } from '../../helpers/notifications';
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

    this.handleSectorClick = this.handleSectorClick.bind(this);
    this.updateSector = this.updateSector.bind(this);
  }

  updateSector(updatedSector) {
    console.log(JSON.stringify(updatedSector));
    axios
      .put(`/api/sectors/${updatedSector.id}.json`, updatedSector)
      .then(() => {
        success('Sector updated');
        
        this.handleSectorClick(updatedSector.id);
      })
      .catch(handleAjaxError);
  }

  componentWillReceiveProps({ bed }) {
    this.setState({ bed });
  }  

  handleSectorClick(id) {
    axios
      .get(`/api/sectors/${id}.json`)
      .then(response => this.setState({ activeSector: response.data }))
      .catch(handleAjaxError);
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
            <Sectors bed={bed} bedID={bed.id} onClick={this.handleSectorClick} activeSector={activeSector} />
          </div>
          <div className="bed-box">
            <SectorForm sector={activeSector} onSubmit={this.updateSector}  />
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