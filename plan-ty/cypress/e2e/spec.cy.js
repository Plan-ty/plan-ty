describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('http://localhost:3000/waterTemp')

    cy.get('[data-cy="war"]').invoke('text')
  })
})