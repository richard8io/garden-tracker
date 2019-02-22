

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  }

  matchSearchTerm(obj) {
    const {
      id, published, created_at, updated_at, ...rest
    } = obj;
    const { searchTerm } = this.state;

    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  }

  renderUsers() {
    const { activeId, users } = this.props;
    const filteredUsers = users
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => b.login - a.login);

    return filteredUsers.map(user => (
      <li key={user.id}>
        <Link to={`/users/${user.id}`} className={activeId === user.id ? 'active' : ''}>
          {user.login}
          {' - '}
          {user.password}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <section className="eventList">
        <h2>
          Users
          <Link to="/users/new">New User</Link>
        </h2>
  
        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />
  
        <ul>{this.renderUsers()}</ul>
      </section>
    );
  }  
    
}

UserList.propTypes = {
  activeId: PropTypes.number,
  userss: PropTypes.arrayOf(PropTypes.object),
};

UserList.defaultProps = {
  activeId: undefined,
  users: [],
};

export default UserList;