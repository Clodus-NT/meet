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

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
        eventCount = this.state.numberOfEvents;
    } else(
        this.setState({ numberOfEvents: eventCount })
    )
    if (location === undefined) {
        location = this.state.locationSelected;
    }
    getEvents().then((events) => {
        let locationEvents = location === "all" ?
            events :
            events.filter((event) => event.location === location);
        this.setState({
            events: locationEvents.slice(0, eventCount),
            numberOfEvents: eventCount,
            locationSelected: location,
        });
    })
}
  // updateEvents = (location, eventCount) => {
  //   if (eventCount === undefined) {
  //     eventCount = this.state.numberOfEvents
  //   } else {
  //     this.setState({ numberOfEvents: eventCount})
  //   }

  //   if (location === undefined) {
  //     location = this.state.locationSelected
  //   }

  //   getEvents().then((events) => {
  //     const locationEvents = 
  //       (location === 'all') 
  //       ? events 
  //       : events.filter((event) => event.location === location);
  //     this.setState({
  //       events: locationEvents.slice(0, this.state.numberOfEvents),
  //       numberOfEvents: eventCount,
  //       locationSelected: location,
  //     });
  //     console.log('eventCount', eventCount);
  //   });
  // }

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
    // const { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
        <CitySearch 
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents 
          updateEvents = { this.updateEvents }
          // numberOfEvents={ numberOfEvents }
          // updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <EventList 
          events={this.state.events} 
        />
      </div>
    )
  }
}

export default App;
