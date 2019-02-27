import React from 'react';
import axios from 'axios';
import BedList from './BedList';
import PropTypes from 'prop-types';
import PropsRoute from '../PropsRoute';
import Bed from './Bed';
import { Switch } from 'react-router-dom';
import BedForm from './BedForm';
import { success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';
import TopNavigation from '../Layout/TopNavigation';

import './Beds.css';
import SectorForm from '../Sectors/SectorForm';
import Sectors from '../Sectors';

class Beds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beds: [],
    };

    this.addBed = this.addBed.bind(this);
    this.deleteBed = this.deleteBed.bind(this);
    this.updateBed = this.updateBed.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/beds.json')
      .then(response => this.setState({ beds: response.data }))
      .catch(handleAjaxError);
  }

  addBed(newBed) {
    axios
      .post('/api/beds.json', newBed)
      .then((response) => {
        success('Bed Added!');
        const savedBed = response.data;
        this.setState(prevState => ({
          beds: [...prevState.beds, savedBed],
        }));
        const { history } = this.props;
        history.push(`/beds/${savedBed.id}`);
      })
      .catch(handleAjaxError);
  }

  updateBed(updatedBed) {
    axios
      .put(`/api/beds/${updatedBed.id}.json`, updatedBed)
      .then(() => {
        success('Bed updated');
        const { beds } = this.state;
        const idx = beds.findIndex(bed => bed.id === updatedBed.id);
        beds[idx] = updatedBed;
        const { history } = this.props;
        history.push(`/beds/${updatedBed.id}`);
        this.setState({ beds });
      })
      .catch(handleAjaxError);
  }

  deleteBed(bedId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/beds/${bedId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Bed deleted');
            const { history } = this.props;
            history.push('/beds');

            const { beds } = this.state;
            this.setState({ beds: beds.filter(bed => bed.id !== bedId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  renderSectorForm(bed) {
    if (bed == null) return null;

    return (
      <div className="bed-box">
        <SectorForm />
      </div>
    );
  }

  render() {
    const { beds } = this.state;
    if (beds === null) return null;

    const { match } = this.props;
    const bedId = match.params.id;
    const bed = beds.find(e => e.id === Number(bedId));

    return (
      <div>
        <TopNavigation />
        <div className="grid">
          <BedList beds={beds} activeId={Number(bedId)} />
          <Switch>
            <PropsRoute path="/beds/new" component={BedForm} onSubmit={this.addBed} />
            <PropsRoute
              exact
              path="/beds/:id/edit"
              component={BedForm}
              bed={bed}
              onSubmit={this.updateBed}
            />
            <PropsRoute
              path="/beds/:id"
              component={Bed}
              bed={bed}
              onDelete={this.deleteBed}
            />
          </Switch>
          {/* {this.renderSectorForm(bed)} */}
        </div>
      </div>
    );
  }
}


Beds.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Beds.defaultProps = {
  match: undefined,
};

export default Beds;