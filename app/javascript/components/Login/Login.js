import React from 'react';
import axios from 'axios';
import PropsRoute from '../PropsRoute';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { success, error } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }

    this.processLogin = this.processLogin.bind(this);
  }

  processLogin(user) {
    axios
      .post('/api/users/0/process_login.json', user)
      .then((response) => {
        if (response.data == true) {
          success('User Logged in!');
          this.setState({ redirect: true });
        } else {
          error("User authentication failed. Please try again.");
        }
      })
      .catch(handleAjaxError);
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/users/index'/>;
    }

    return (
      <div>
        <Switch>
          <PropsRoute path="/login/new" component={LoginForm} onSubmit={this.processLogin} />
        </Switch>
      </div>
    );
  }
}

export default Login;