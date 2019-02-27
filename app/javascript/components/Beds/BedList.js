

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

  // TODO: Apply multiple search fields when they are added to the model.
  applySearchTerm(beds) {
    const { searchTerm } = this.state;
    const filteredBeds = beds.filter((bed) => {
      let bedName = bed.name.toLowerCase()
      return bedName.indexOf(
        searchTerm.toLowerCase()) !== -1
    }).sort((a, b) => b.name - a.name);
    return filteredBeds;
  }

  renderBeds() {
    const { activeId, beds } = this.props;
    const filteredBeds = this.applySearchTerm(beds);

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
  beds: PropTypes.arrayOf(PropTypes.object),
};

BedList.defaultProps = {
  activeId: undefined,
  beds: [],
};

export default BedList;