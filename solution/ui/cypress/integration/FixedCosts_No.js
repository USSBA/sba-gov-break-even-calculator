/// <reference types=“cypress” />

describe ('Fixed Cost Option No', () => {
    it('Checks No and Confirms Next Page', () => {
      cy.visit('localhost:8000')
      cy.get('.fixedCosts-container').scrollIntoView()
        .contains('No').click()
      cy.get('#Utilities').type(200)
      cy.get('#Rent').type(1600)
      cy.get('#Insurance').type(200)
      cy.get('[type="submit"]:visible').click()
      cy.get('#unitPrice').should('be.visible')
    })

})