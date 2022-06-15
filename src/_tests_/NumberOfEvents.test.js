import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render input box', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  })

  test('render 32 events by default', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events').get(0).props.value).toEqual(32);
  });

  test('render user specified number of events correctly', () => {
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', {
      target: { value: 16 },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(16);
  });


})