import React from 'react';
import axios from 'axios';
// import BedList from './BedList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Sector from './Sector';
import { Switch } from 'react-router-dom';
// import BedForm from './BedForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Sectors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sectors: null,
    };

    // this.addBed = this.addBed.bind(this);
    // this.deleteBed = this.deleteBed.bind(this);
    // this.updateBed = this.updateBed.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/sectors.json')
      .then(response => this.setState({ sectors: response.data }))
      .catch(handleAjaxError);
  }

  // addBed(newBed) {
  //   axios
  //     .post('/api/beds.json', newBed)
  //     .then((response) => {
  //       success('Bed Added!');
  //       const savedBed = response.data;
  //       this.setState(prevState => ({
  //         beds: [...prevState.beds, savedBed],
  //       }));
  //       const { history } = this.props;
  //       history.push(`/beds/${savedBed.id}`);
  //     })
  //     .catch(handleAjaxError);
  // }

  // updateBed(updatedBed) {
  //   axios
  //     .put(`/api/beds/${updatedBed.id}.json`, updatedBed)
  //     .then(() => {
  //       success('Bed updated');
  //       const { beds } = this.state;
  //       const idx = beds.findIndex(bed => bed.id === updatedBed.id);
  //       beds[idx] = updatedBed;
  //       const { history } = this.props;
  //       history.push(`/beds/${updatedBed.id}`);
  //       this.setState({ beds });
  //     })
  //     .catch(handleAjaxError);
  // }

  // deleteBed(bedId) {
  //   const sure = window.confirm('Are you sure?');
  //   if (sure) {
  //     axios
  //       .delete(`/api/beds/${bedId}.json`)
  //       .then((response) => {
  //         if (response.status === 204) {
  //           success('Bed deleted');
  //           const { history } = this.props;
  //           history.push('/beds');

  //           const { beds } = this.state;
  //           this.setState({ beds: beds.filter(bed => bed.id !== bedId) });
  //         }
  //       })
  //       .catch(handleAjaxError);
  //   }
  // }

  render() {
    console.log(1);
    const { sectors } = this.state;
    if (sectors === null) return null;
    console.log(2);
    const { match } = this.props;
    const sectorId = match.params.id;
    const sector = sectors.find(e => e.id === Number(sectorId));
    console.log(3);
    return (
      <div>
        <div className="grid">
          <h3>test</h3>
          <h3>sector_id={sectorId}</h3>
          <Sector sector={sector} />
          {/* <BedList beds={sectors} activeId={Number(sectorId)} />
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
          </Switch> */}
        </div>
      </div>
    );
  }
}


Sectors.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Sectors.defaultProps = {
  match: undefined,
};

export default Sectors;