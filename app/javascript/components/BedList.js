

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class BedList extends React.Component {
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

  renderBeds() {
    const { activeId, beds } = this.props;
    const filteredBeds = beds
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => b.name - a.name);

    return filteredBeds.map(bed => (
      <li key={bed.id}>
        <Link to={`/beds/${bed.id}`} className={activeId === bed.id ? 'active' : ''}>
          {bed.name}
        </Link>
      </li>
    ));
  }

  // TODO: Update all of the 'event' css naming to match.
  render() {
    return (
      <section className="eventList">
        <h2>
          Beds
          <Link to="/beds/new">New Bed</Link>
        </h2>
  
        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />
  
        <ul>{this.renderBeds()}</ul>
      </section>
    );
  }  
    
}

BedList.propTypes = {
  activeId: PropTypes.number,
  userss: PropTypes.arrayOf(PropTypes.object),
};

BedList.defaultProps = {
  activeId: undefined,
  users: [],
};

export default BedList;