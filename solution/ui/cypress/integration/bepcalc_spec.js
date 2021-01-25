/// <reference types=“cypress” />

describe ('Our first suite', () => {
  it('BEP Calc Test', () => {
    cy.visit('localhost:8000')
    cy.get('.fixedCosts-container').scrollIntoView()
    cy.contains('Yes').click()
    cy.focused()
        .should('have.id', 'totalFixedCosts')
    cy.get('#totalFixedCosts').type(2500)
    cy.contains('CONTINUE').click()
    cy.get('.pricePerUnit-container')
    cy.focused()
       .should('have.id', 'unitPrice')
    cy.get('#unitPrice').type(12)
    cy.get('[type="submit"]').click()
  })
})