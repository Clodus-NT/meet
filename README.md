//User Stories:

Feature 1: Show/Hide An Event's Details
  *Scenario 1: An event element is collapsed by default
    -Given the user has searched for events
    -When the user has not clicked on any event's expand details button
    -Then the user should be able to scroll through events while details are collapsed

    As a user, I should be able to scroll through events without seeing details until I choose to expand them so that I can more easily find events.

  *Scenario 2: User can expand an event to see its details
    -Given the user wishes to see details of the event
    -When the user clicks see more details button
    -Then the details expand and are displayed

    As a user, I should be able to an event and expand it's details so that I can learn more about the event.

  *Scenario 3: User can collapse an event to hide details
    -Given user is no longer wishes to see expanded details
    -When the user clicks "hide details"
    -Then the details should collapse and be hidden

    As a user, I should be able to collapse/hide details of an event so that I can continue to scroll without clutter

Feature 2: Specify Number of Events
  *Scenario 1: When user hasn’t specified a number, 32 is the default number
    -Given the user has not specified a number of events
    -When events are loaded
    -Then the default number of events that load is 32

    As a user, I should be able to search without specifying the number of events so that the default number of events to load is 32

  *Scenario 2: User can change the number of events they want to see
    -Given the user wishes to set a specific number of events to load
    -When the user selects the number of event to load
    -Then the default number of 32 events is overwritten to be the user specified amount

    As a user, I should be able to change the default number of events that display so that I can choose how many I would like to display.

Feature 3: Use the App When Offline
  *Scenario 1: Show cached data when there's no internet connection
    -Given the user has no internet connection
    -When the user wants to use the app offline
    -Then cached data will still be available

    As a user, I should be able to rely on cached data so that the app functions offline.

  *Scenario 2: Show error when user changes the settings (city, time range)
    -Given user has no internet connection
    -When user tries to change the city/time range
    -Then user will get an error message

    As a user, I should be able to see an error message so that I will know that city/time range cannot be changed while offline

Feature 4: Data Visualization
  Scenario 1: Show a chart with the number of upcoming events in each city
  -Given user is looking at events
  -When user clicks on chart
  -Then a chart is displayed with the number of upcoming events in the selected city

  As a user, I should be able to click on a chart so that I can see the number of upcoming events in specified city.