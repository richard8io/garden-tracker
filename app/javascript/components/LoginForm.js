import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateBed } from '../helpers/helpers';
import { Link } from 'react-router-dom';
import './Login/Login.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
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
    const { user } = this.state;
    const { path } = this.props;

    return (
      <div className="login-wrapper">
        <div className="login-box login-a">A</div>
        <div className="login-box login-b">B</div>
        <div className="login-box login-c">
          {this.renderErrors()}
          <form className="eventForm" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="login">
                <strong>Login:</strong>
                <input
                  type="text"
                  id="login"
                  name="login"
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
                />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit">Enter</button>
            </div>
          </form>
        </div>
        <div className="login-box login-d">D</div>
        <div className="login-box login-e">E</div>
      </div>
    );
  } 
}

LoginForm.propTypes = {
  user: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

LoginForm.defaultProps = {
  user: {
    login: '',
    password: ''
  },
};

export default LoginForm;
