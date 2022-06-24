import React from 'react';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from "jest-cucumber";
import App from '../App';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  let AppWrapper;

  //Scenario 1
  test('When the user has not clicked on an event, each event element should be collapsed.', ({ given, when, then }) => {
    given('the main page is open', () => {
      AppWrapper = mount(<App />);
    });
    when('the user has not clicked on an event', () => {
      //no code needed as user has not clicked on anything
    });
    then('each event element should be collapsed.', () => {
      expect(AppWrapper.find('.event__Details')).toHaveLength(0);
    });
  });

  //Scenario 2
  test('When the user clicks on a collapsed event element, the element should expand.', ({ given, when, then }) => {
    given('an event element is collapsed', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('.event__Details')).toHaveLength(0);
    });
    when('the user clicks on an event', () => {
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });
    then('the event element should expand.', () => {
      expect(AppWrapper.find('.event__Details')).toHaveLength(1);
    });
  });

  //Scenario 3
  test('When the user clicks on an expanded event element, the element should collapse.', ({ given, when, then }) => {
    given('an event element is expanded', () => {
      // AppWrapper = mount(<App />);
      // AppWrapper.update();
      // AppWrapper.find('.details-btn').at(0).simulate('click');
      // expect(AppWrapper.find('.event__Details')).toHaveLength(1);
    });
    when('the user clicks on an event', () => {
      // AppWrapper.update();
      // AppWrapper.find('.details-btn').at(0).simulate('click');
    });
    then('the event element should collapse.', () => {
      // expect(AppWrapper.find('.event__Details')).toHaveLength(0);
    });
  });
});