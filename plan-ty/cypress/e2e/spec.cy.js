describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy="menu"]').click();

    cy.get('[data-cy="temp"]').click();

    cy.get('[data-cy="menu"]').click();

    cy.get('[data-cy="flow"]').click();

    cy.get('[data-cy="menu"]').click();

    cy.get('[data-cy="ec"]').click();

    cy.get('[data-cy="menu"]').click();

    cy.get('[data-cy="temp"]').click();

    cy.get('[data-cy="menu"]').click();

    cy.get('[data-cy="temp"]').click();
  })
})