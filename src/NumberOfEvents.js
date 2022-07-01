import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 16
  };

  handleInputChanged = (event) => {
    const value = parseInt(event.target.value);
    this.props.updateEvents(undefined, value);

    if (value < 1 || value > 32) {
      this.setState({
        infoText: 'Select number from 1 to 32',
      });
    } else {
      this.setState({
        infoText: '',
      });
    }
  };

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
        <ErrorAlert text={this.state.infoText} />
      </div>
    )
  }
}

export default NumberOfEvents;