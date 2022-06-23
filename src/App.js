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
    locationSelected: undefined,
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      console.log('didMount,', events);
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events), });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      { numberOfEvents },
      this.updateEvents(this.state.locations, numberOfEvents)
    )
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = 
        (location === 'all') 
        ? events 
        : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents),
        locationSelected: location,
      });
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
        <EventList 
          events={this.state.events} 
        />
        <NumberOfEvents 
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
      </div>
    )
  }
}

export default App;
