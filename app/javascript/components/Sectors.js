import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopNavigation from './Layout/TopNavigation';
import { handleAjaxError } from '../helpers/helpers';
import { Link } from 'react-router-dom';
import Bed from './Beds/Bed'

class Sectors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sectors: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(sectorID, e) {  
    const { onClick } = this.props;
    onClick(sectorID);
  }

  loadSectorsFromAPI() {
    const { bed } = this.props;
    axios
      .get(`/api/sectors.json?bed_id=${bed.id}`)
      .then(response => this.setState({ sectors: response.data }))
      .catch(handleAjaxError);
  }

  componentDidMount() {
    this.loadSectorsFromAPI();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.bedID !== prevProps.bedID) {
      this.loadSectorsFromAPI();
    }
  }

  renderBoxes(bed) {
    const { sectors } = this.state;
    if (sectors == null) return null;

    var rows = [];
    {this.state.sectors.map((sector, key) =>
      rows.push(<Link to="#" className="sectorLink" onClick={this.handleClick.bind(this, sector.id)} key={sector.id}><div className="box" key={sector.id}>{sector.id}:<br/>{sector.name}</div></Link>)
    )}
    return rows;
  }

  render () {
    const { bed } = this.props;
    if (bed === null) return null;
    
    return (
      <div className={`wrapper${bed.rows}`}>
        {this.renderBoxes(bed)}
      </div>
    );
  }
}

// Reference = https://flaviocopes.com/react-proptypes/
Sectors.propTypes = {
  bedID: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  bed: PropTypes.shape()
};

Sectors.defaultProps = {
  bed: undefined,
  bedID: undefined
};

export default Sectors;