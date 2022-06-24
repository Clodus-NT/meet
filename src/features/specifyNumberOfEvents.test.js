import React from 'react';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from "jest-cucumber";
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppWrapper;

  test('When user has not specified a number, 32 is the default number.', ({ given, when, then }) => {
    given('the user is on the main page of the app', () => {
      AppWrapper = mount(<App />);
    });
    when('the user has not specified a number of events', () => {
      //no code need as user has not specified anything
    });
    then('the default number of displayed events will be 32', () => {
      expect((AppWrapper.find('.event')).length).toBeLessThanOrEqual(32);
    });
});

//Scenario 2
test('User can change the number of events they want to see.', ({ given, when, then }) => {
    given('the user is on the main page', () => {
      AppWrapper = mount(<App />);
    });
    when('the user specifies a number of events', () => {
      const numberOfEvents = { target: { value: 16 } };
      AppWrapper.find('.numberOfEvents').simulate('change', numberOfEvents);
    });
    then('this number of events will be displayed', () => {
      expect((AppWrapper.find('.event')).length).toBeLessThanOrEqual(16);
    });
  });
});