import React from 'react';
import axios from 'axios';
import PropsRoute from '../PropsRoute';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import { success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  processLogin(user) {
    axios
      .post('/api/users/3/process_login.json', user)
      .then((response) => {
        success('User Logged in!');
        console.log(response.data);
        // const savedUser = response.data;
        // this.setState(prevState => ({
        //   users: [...prevState.users, savedUser],
        // }));
        // const { history } = this.props;
        // history.push(`/users/${savedUser.id}`);
      })
      .catch(handleAjaxError);
  }

  render() {
    return (
      <div>
        <Switch>
          {/* <Route path="/login/new" component={LoginForm} onSubmit={this.logIn} /> */}
          <PropsRoute path="/login/new" component={LoginForm} onSubmit={this.processLogin} />
        </Switch>
      </div>
    );
  }
}

export default Login;