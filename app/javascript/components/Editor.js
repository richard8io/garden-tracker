

import React from 'react';
import axios from 'axios';
import Header from './Header';
import EventList from './EventList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Event from './Event';
import { Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    console.log("testin");
    super(props);

    this.state = {
      events: null,
    };

    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/users.json')
      .then(response => this.setState({ events: response.data }))
      .catch(handleAjaxError);
  }

  addEvent(newEvent) {
    axios
      .post('/api/users.json', newEvent)
      .then((response) => {
        success('User Added!');
        const savedEvent = response.data;
        this.setState(prevState => ({
          events: [...prevState.events, savedEvent],
        }));
        const { history } = this.props;
        history.push(`/users/${savedEvent.id}`);
      })
      .catch(handleAjaxError);
  }

  updateEvent(updatedEvent) {
    axios
      .put(`/api/users/${updatedEvent.id}.json`, updatedEvent)
      .then(() => {
        success('Event updated');
        const { events } = this.state;
        const idx = events.findIndex(event => event.id === updatedEvent.id);
        events[idx] = updatedEvent;
        const { history } = this.props;
        history.push(`/users/${updatedEvent.id}`);
        this.setState({ events });
      })
      .catch(handleAjaxError);
  }

  deleteEvent(eventId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/users/${eventId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('User deleted');
            const { history } = this.props;
            history.push('/users');

            const { events } = this.state;
            this.setState({ events: events.filter(event => event.id !== eventId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  render() {
    const { events } = this.state;
    if (events === null) return null;

    const { match } = this.props;
    const eventId = match.params.id;
    const event = events.find(e => e.id === Number(eventId));

    console.log("one");

    return (
      <div>
        <Header />
        <div className="grid">
          <EventList events={events} activeId={Number(eventId)} />
          <Switch>
            <PropsRoute path="/users/new" component={LoginForm} onSubmit={this.addEvent} />
            <PropsRoute
              exact
              path="/users/:id/edit"
              component={LoginForm}
              event={event}
              onSubmit={this.updateEvent}
            />
            <PropsRoute
              path="/users/:id"
              component={Event}
              event={event}
              onDelete={this.deleteEvent}
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