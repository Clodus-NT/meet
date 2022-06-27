import React, { Component } from 'react';
import './App.css';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { OfflineAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    locationSelected: 'all',
    showWelcomeScreen: undefined,
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);

    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid)})

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events), });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        offlineText: 'You\'re offline. Data has been loaded from the cache'
      });
    } else {
      this.setState({
        offlineText: ''
      });
    }
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
    const { locations, events, numberOfEvents, offlineText, showWelcomeScreen } = this.state;

    if (this.state.showWelcomeScreen === undefined) return <div className='App' />

    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <OfflineAlert text={offlineText} />
        <CitySearch 
          locations={locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents 
          updateEvents={ this.updateEvents }
          numberOfEvents={ numberOfEvents }
        />
        <EventList 
          events={events} 
        />
        <WelcomeScreen 
          showWelcomeScreen={showWelcomeScreen} 
          getAccessToken={()=> { getAccessToken() }} 
        />
      </div>
    )
  }
}

export default App;
