import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateBed } from '../helpers/helpers';
import { Link } from 'react-router-dom';
// import UserNotFound from './UserNotFound';

class BedForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bed: props.bed,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { bed } = this.state;
    const errors = validateBed(bed);
  
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(bed);
    }
  }

  componentWillReceiveProps({ bed }) {
    this.setState({ bed });
  }  

  updateBed(key, value) {
    this.setState(prevState => ({
      bed: {
        ...prevState.bed,
        [key]: value,
      },
    }));
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  handleInputChange(bed) {
    const { target } = bed;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateBed(name, value);
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
    const { bed } = this.state;
    const { path } = this.props;

    if (!bed.id && path === '/beds/:id/edit') return <UserNotFound />;

    const cancelURL = bed.id ? `/beds/${bed.id}` : '/beds';
    const title = bed.id ? `${bed.name}` : 'New Name';

    return (
      <div>
        <h2>{title}</h2>
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
                value={bed.name}
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

BedForm.propTypes = {
  bed: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

BedForm.defaultProps = {
  bed: {
    name: ''
  },
};

export default BedForm;
