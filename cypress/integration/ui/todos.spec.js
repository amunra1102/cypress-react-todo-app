/// <reference types="cypress" />

describe('Todo UI Testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should add new todo correctly', () => {
    cy.intercept('POST', 'http://localhost:8080/todos').as('postRequest');

    cy.addNewTodo('First Todo');

    cy.wait('@postRequest').then(xhr => {
      expect(xhr.request.body.name).to.eql('First Todo');
    });

    cy.get('.todo-item').last().should('contain.text', 'First Todo');
  });

  it('should be able to toggle the status of a todo correctly', () => {
    cy.addNewTodo('Second Todo');

    cy.get('.todo-checkbox').check().should('be.checked');
    cy.get('.todo-checkbox').uncheck().should('not.be.checked');
  });

  it('should delete a todo correctly', () => {
    cy.addNewTodo('Third Todo');
    cy.get('.delete-item').click();
  });

  it('should not add an empty todo', () => {
    cy.addNewTodo('');
  });

  afterEach(() => {
    cy.get('body').then($element => {
      if ($element.find('.delete-item').length) {
        cy.get('.delete-item').click({ multiple: true });
      }
    })
  });
});
