import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateSector } from '../../helpers/helpers';
import { Link } from 'react-router-dom';
import SectorNotFound from './SectorNotFound';

class SectorForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sector: props.sector,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { sector } = this.state;
    const errors = validateSector(sector);
  
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(sector);
    }
  }

  componentWillReceiveProps({ sector }) {
    this.setState({ sector });
  }  

  updateSector(key, value) {
    this.setState(prevState => ({
      sector: {
        ...prevState.sector,
        [key]: value,
      },
    }));
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  handleInputChange(sector) {
    const { target } = sector;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateSector(name, value);
  }  

  renderErrors() {
    const { errors } = this.state;

    if (this.isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the bed from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {   
    const { sector } = this.state;
    const { path } = this.props;

    if (sector === null) return <SectorNotFound />;
    
    if (sector.name == null) sector.name = "";
    if (sector.notes == null) sector.notes = "";

    return (
      <div>
        <section className="eventList">
          <h2>{sector.name}</h2>
          {this.renderErrors()}
          <form className="eventForm" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">
                <strong>Name:</strong>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={this.handleInputChange}
                  value={sector.name}
                />
              </label>
            </div>
            <div>
              <label htmlFor="row">
                <strong>Row:</strong>
                <input
                  type="text"
                  id="row"
                  name="row"
                  disabled={true}
                  onChange={this.handleInputChange}
                  value={sector.row}
                />
              </label>
            </div>
            <div>
              <label htmlFor="column">
                <strong>Column:</strong>
                <input
                  type="text"
                  id="column"
                  name="column"
                  disabled={true}
                  onChange={this.handleInputChange}
                  value={sector.column}
                />
              </label>
            </div>
            <div>
              <label htmlFor="column">
                <strong>Notes:</strong>
                <textarea
                  id="notes"
                  name="notes"
                  rows="8"
                  onChange={this.handleInputChange}
                  value={sector.notes}
                />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit">Enter</button>
            </div>
          </form>
        </section>
      </div>
    );
  } 
}

SectorForm.propTypes = {
  sector: PropTypes.shape(),
  // onSubmit: PropTypes.func.isRequired,
  // path: PropTypes.string.isRequired
};

SectorForm.defaultProps = {
  sector: {
    name: '',
    row: '',
    column: ''
  },
};

export default SectorForm;