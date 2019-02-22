import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateEvent } from '../helpers/helpers';
import { Link } from 'react-router-dom';
import EventNotFound from './EventNotFound';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: props.event,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { event } = this.state;
    const errors = validateEvent(event);
  
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(event);
    }
  }

  componentWillReceiveProps({ event }) {
    this.setState({ event });
  }  

  updateEvent(key, value) {
    this.setState(prevState => ({
      event: {
        ...prevState.event,
        [key]: value,
      },
    }));
  }  

  validateEvent(event) {
    const errors = {};

    if (event.event_type === '') {
      errors.login = 'You must enter a login';
    }

    if (event.password === '') {
      errors.event_date = 'You must enter a password';
    }

    console.log(event);
    return errors;
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateEvent(name, value);
  }
  

  renderErrors() {
    const { errors } = this.state;

    if (this.isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { event } = this.state;
    const { path } = this.props;

    if (!event.id && path === '/users/:id/edit') return <EventNotFound />;

    const cancelURL = event.id ? `/events/${event.id}` : '/events';
    const title = event.id ? `${event.event_date} - ${event.event_type}` : 'New Event';

    return (
      <div>
        <h2>{title}</h2>
        {this.renderErrors()}
        <form className="eventForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="login">
              <strong>Login:</strong>
              <input
                type="text"
                id="login"
                name="login"
                onChange={this.handleInputChange}
                value={event.login}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <strong>Password:</strong>
              <input
                type="password"
                id="password"
                name="password"
                value={event.password}
                onChange={this.handleInputChange}
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

UserForm.propTypes = {
  event: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

UserForm.defaultProps = {
  event: {
    login: '',
    password: ''
  },
};

export default UserForm;
