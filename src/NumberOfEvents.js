import React, { Component } from 'react';

class NumberOfEvents extends Component {
  // state = {
  //   numberOfEvents: 32
  // };

  handleInputChanged = (event) => {
    const value = parseInt(event.target.value);
    this.props.updateEvents(undefined, value);
  }

  render() {
    return (
      <div className='numberOfEvents'>
        <label>Number of Events:</label>
        <input
          className='number-of-events'
          type='number'
          value={this.props.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    )
  }
}

export default NumberOfEvents;