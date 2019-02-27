import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateBed } from '../../helpers/helpers';
import { Link } from 'react-router-dom';

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

  updateBed(key, value) {
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
    const { path, sector } = this.props;

    if (sector === null) {
      return (
        <h1>not found</h1>
      );
    }

    return (
      <div>
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
                onChange={this.handleInputChange}
                value={sector.column}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Enter</button>
          </div>
        </form>
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