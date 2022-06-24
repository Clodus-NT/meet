Feature: Specify number of events

    Scenario: When user has not specified a number, 32 is the default number.
        Given the user is on the main page of the app
        When the user has not specified a number of events
        Then the default number of displayed events will be 32

    Scenario: User can change the number of events they want to see.
        Given the user is on the main page
        When the user specifies a number of events
        Then this number of events will be displayed