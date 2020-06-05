Feature: Show weather
  In order to check the weather
  As a user
  I want to see and compare current and future weather in the city

Scenario: Searching for city
  Given I am on the main page
  When I search for the weather in a city
  Then I should see the city weather
  And I should see all main cities weather

Scenario: Searching for main polish city
  Given I am on the main page
  When I search for the weather in main polish city
  Then I should see the weather in main polish city
  And I should see the other main cities weather

Scenario: Searching for non existing city
  Given I am on the main page
  When I search for the city which does not exist
  Then I should see the 'City not found' message

Scenario: Coming from url
  When I try to load city from url
  Then I should see the city weather
  And I should see all main cities weather

