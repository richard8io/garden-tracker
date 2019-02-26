import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateUser } from '../../helpers/helpers';
import { Link } from 'react-router-dom';
import UserNotFound from './UserNotFound';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { user } = this.state;
    const errors = validateUser(user);
  
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(user);
    }
  }

  componentWillReceiveProps({ user }) {
    this.setState({ user });
  }  

  updateUser(key, value) {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [key]: value,
      },
    }));
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  handleInputChange(user) {
    const { target } = user;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateUser(name, value);
  }
  
  renderErrors() {
    const { errors } = this.state;

    if (this.isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the user from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { user } = this.state;
    const { path } = this.props;

    if (!user.id && path === '/users/:id/edit') return <UserNotFound />;

    const cancelURL = user.id ? `/users/${user.id}` : '/users';
    const title = user.id ? `${user.login} - ${user.password}` : 'New Password';

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
                value={user.login}
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
                value={user.password}
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
  user: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

UserForm.defaultProps = {
  user: {
    login: '',
    password: ''
  },
};

export default UserForm;
