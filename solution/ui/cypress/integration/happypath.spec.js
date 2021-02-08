/// <reference types=“cypress” />

describe ('Happy path through BEP Calc', () => {
  it('Gets through first page', () => {
    cy.visit('localhost:8000')
    cy.get('.fixedCosts-container').scrollIntoView()
      .contains('Yes').click()
    cy.focused()
      .should('have.id', 'totalFixedCosts')
    cy.get('#totalFixedCosts').type(2500)
    cy.get('[type="submit"]:visible').click()
  })

  it('Gets through second page', () => {
    cy.get('.pricePerUnit-container')
    cy.focused()
      .should('have.id', 'unitPrice')
    cy.get('#unitPrice').type(20)
    cy.get('[type="submit"]:visible').click()
  })

  it('Gets through third page', () => {
    cy.get('.unitSales-container')
    cy.focused()
      .should('have.id', 'units')
    cy.get('#units').type(1000)
    cy.get('[type="submit"]:visible').click()
  })
})
