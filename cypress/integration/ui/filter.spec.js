/// <reference types="cypress" />

describe('Filter functionality test cases', () => {

  beforeEach(() => {
    cy.viewport(1000, 1500);

    cy.intercept({
      method: 'GET',
      url: 'http://localhost:8080/todos'
    }, {
      fixture: 'todos'
    });
    cy.visit('http://localhost:3000');
  });

  it('should filter the completed todos correctly', () => {
    cy.contains('Complete').click();
    cy.url().should('contain', '/complete');
    cy.get('.todo-checkbox').each(el => {
      cy.wrap(el).should('be.checked');
    });
  });

  it('should filter the active todos correctly', () => {
    cy.contains('Active').click();
    cy.url().should('contain', '/active');
    cy.get('.todo-checkbox').each(el => {
      cy.wrap(el).should('not.be.checked');
    });
  });

  after(() => {
    cy.get('body').then($element => {
      if ($element.find('.delete-item').length) {
        cy.wait(10000);
        cy.get('.delete-item').click({ multiple: true });
      }
    });
  });
});
