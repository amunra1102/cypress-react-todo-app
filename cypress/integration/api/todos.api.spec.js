/// <reference types="cypress" />

describe('Test all the todos using the API', () => {
  let id = -1;

  it('should add to todo correctly using the api', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/todos',
      body: {
        name: 'Learn Cypress',
        isComplete: true
      }
    }).then(response => {
      id = response.body.id;
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eql('Learn Cypress');
    });
  });

  it('should get to a specific todo correctly using the api', () => {
    cy.request({
      method: 'GET',
      url: `http://localhost:8080/todos/${id}`
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eql('Learn Cypress');
    });
  });

  it('should update the status of a todo correctly using the api', () => {
    cy.request({
      method: 'PUT',
      url: `http://localhost:8080/todos/${id}`,
      body: {
        name: 'Learn Cypress',
        isComplete: false
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.isComplete).to.false;
    });
  });

  it('should delete a todo using the api', () => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:8080/todos/${id}`
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});
