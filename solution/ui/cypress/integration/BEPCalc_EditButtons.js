/// <reference types=“cypress” />

describe ('BEP Calc Edit options', () => {
    it('Clicks on the Fixed Costs edit link', () => {
      cy.visit('localhost:8000')
      cy.get('.fixedCosts-container').scrollIntoView()
        .contains('Yes').click()
      cy.focused()
        .should('have.id', 'totalFixedCosts')
      cy.get('#totalFixedCosts').type(5000)
      cy.get('[type="submit"]:visible').click()
      cy.get('.editButton').click()
    })

})