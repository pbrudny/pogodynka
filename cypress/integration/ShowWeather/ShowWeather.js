import { Given, Before, When, And, Then } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.viewport(1280, 1060);
});

Given('I am on the main page', () => {
  cy.visit('/')
});

When('I search for the weather in a city', () => {
  cy.get('.ant-input').type('Cieszyn').should('have.value', 'Cieszyn')
  cy.contains('Szukaj').click();
});

Then('I should see the city weather', (term) => {
  cy.contains('Cieszyn (PL)');
});

Then('I should see all main cities weather', (term) => {
  cy.contains('Wrocław (PL)');
  cy.contains('Kraków (PL)');
  cy.contains('Warszawa (PL)');
});

Then('I should see the other main cities weather', (term) => {
  cy.contains('Wrocław (PL)').should('have.length', 1);
  cy.contains('Kraków (PL)').should('have.length', 1);
  cy.contains('Poznań (PL)').should('have.length', 1);
  cy.contains('Warszawa (PL)').should('have.length', 1)
});

Then("I should see the 'City not found' message", (term) => {
  cy.contains('City not found');
});

When('I search for the weather in main polish city', () => {
  cy.get('.ant-input').type('Warszawa').should('have.value', 'Warszawa')
  cy.contains('Szukaj').click();
});

When('I search for the city which does not exist', () => {
  cy.get('.ant-input').type('Nibylandia').should('have.value', 'Nibylandia')
  cy.contains('Szukaj').click();
});

When('I try to load city from url', () => {
  cy.visit('/cieszyn')
});

Then('I should see the weather in main polish city', (term) => {
  cy.contains('Warszawa (PL)');
});