import React from 'react';
import axios from 'axios';
import PropsRoute from './PropsRoute';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import LoginForm from './LoginForm.js';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  logIn() {
    return;
  }

  render() {
    return (
      <div>
        <Switch>
          {/* <Route path="/login/new" component={LoginForm} onSubmit={this.logIn} /> */}
          <PropsRoute path="/login/new" component={LoginForm} onSubmit={this.logIn} />
        </Switch>
      </div>
    );
  }
}

export default Login;