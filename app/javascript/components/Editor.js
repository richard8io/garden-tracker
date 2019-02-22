

import React from 'react';
import axios from 'axios';
import Header from './Header';
import UserList from './UserList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import User from './User';
import { Switch } from 'react-router-dom';
import UserForm from './UserForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };

    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/users.json')
      .then(response => this.setState({ users: response.data }))
      .catch(handleAjaxError);
  }

  addUser(newUser) {
    axios
      .post('/api/users.json', newUser)
      .then((response) => {
        success('User Added!');
        const savedUser = response.data;
        this.setState(prevState => ({
          users: [...prevState.users, savedUser],
        }));
        const { history } = this.props;
        history.push(`/users/${savedUser.id}`);
      })
      .catch(handleAjaxError);
  }

  updateUser(updatedUser) {
    axios
      .put(`/api/users/${updatedUser.id}.json`, updatedUser)
      .then(() => {
        success('User updated');
        const { users } = this.state;
        const idx = users.findIndex(user => user.id === updatedUser.id);
        users[idx] = updatedUser;
        const { history } = this.props;
        history.push(`/users/${updatedUser.id}`);
        this.setState({ users });
      })
      .catch(handleAjaxError);
  }

  deleteUser(userId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/users/${userId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('User deleted');
            const { history } = this.props;
            history.push('/users');

            const { users } = this.state;
            this.setState({ users: users.filter(user => user.id !== userId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  render() {
    const { users } = this.state;
    if (users === null) return null;

    const { match } = this.props;
    const userId = match.params.id;
    const user = users.find(e => e.id === Number(userId));

    return (
      <div>
        <Header />
        <div className="grid">
          <UserList users={users} activeId={Number(userId)} />
          <Switch>
            <PropsRoute path="/users/new" component={UserForm} onSubmit={this.addUser} />
            <PropsRoute
              exact
              path="/users/:id/edit"
              component={UserForm}
              user={user}
              onSubmit={this.updateUser}
            />
            <PropsRoute
              path="/users/:id"
              component={User}
              user={user}
              onDelete={this.deleteUser}
            />
          </Switch>
        </div>
      </div>
    );
  }
}


Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};

export default Editor;