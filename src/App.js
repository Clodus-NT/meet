import React, { Component } from 'react';
import './App.css';
import { extractLocations, getEvents } from './api';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    locationSelected: 'all',
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events), });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents
    } else {
      this.setState({ numberOfEvents: eventCount})
    }

    if (location === undefined) {
      location = this.state.locationSelected
    }

    getEvents().then((events) => {
      const locationEvents = 
        (location === 'all') ?
        events :
        events.filter((event) => event.location === location); 
      this.setState({
        events: locationEvents.slice(0, eventCount),
        numberOfEvents: parseInt(eventCount),
        locationSelected: location,
      });
      console.log('eventCount', eventCount, eventCount + 1);
    });
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, number };
    })
    return data;
  }

  render() {
    return (
      <div className="App">
        <CitySearch 
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents 
          updateEvents={ this.updateEvents }
          numberOfEvents={ this.state.numberOfEvents }
        />
        <EventList 
          events={this.state.events} 
        />
      </div>
    )
  }
}

export default App;
