/// <reference types=“cypress” />

describe ('BEP Calc Edit options', () => {
    it('Clicks on the Total fixed cost edit link', () => {
      cy.visit('localhost:8000')
      cy.get('.fixedCosts-container').scrollIntoView()
        .contains('Yes').click()
      cy.focused()
        .should('have.id', 'totalFixedCosts')
      cy.get('#totalFixedCosts').type(5000)
      cy.get('[type="submit"]:visible').click()
      cy.get('.editButton').click()
      cy.get('[aria-label="apply"]:visible').click()
    })

    it('Clicks on the Selling price per unit edit link', () => {
      cy.get('.pricePerUnit-container').scrollIntoView()
      cy.get('#unitPrice').type(25)
      cy.get('[type="submit"]:visible').click()
      cy.get('[aria-label="edit Selling price per unit"]:visible').click()
      cy.get('[aria-label="apply"]:visible').click()
    })

    it('Clicks on the Number of units edit link', () => {
      cy.get('.unitSales-container').scrollIntoView()
      cy.get('#units').type(2000)
      cy.get('[type="submit"]:visible').click()
      cy.get('[aria-label="edit Number of units"]:visible').click()
      cy.get('[aria-label="apply"]:visible').click()
    })

    it('Clicks on the Variable Costs edit link', () => {
      cy.get('.variableCosts-container').scrollIntoView()
        .contains('Yes').click().click()
      cy.get('#totalVariableCosts').type(10)
      cy.get('[type="submit"]:visible').click()
      cy.get('[aria-label="edit Variable Costs"]:visible').click()
      cy.get('[aria-label="apply"]:visible').click()
    })
})