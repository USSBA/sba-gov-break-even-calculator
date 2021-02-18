/// <reference types=“cypress” />

describe ('BEP Calc Accordians test', () => {
    it('Clicks on the Accordians for the Fixed Costs page', () => {
      cy.visit('localhost:8000')
      cy.get('.accordionContainer').scrollIntoView()
      cy.get('.accordion').contains('How to calculate a fixed cost that is not paid monthly').click()
      cy.get('.fixedCosts-container').scrollIntoView()
        .contains('Yes').click().click()
      cy.focused()
        .should('have.id', 'totalFixedCosts')
      cy.get('#totalFixedCosts').type(2855)
      cy.get('[type="submit"]:visible').click()
    })

    it('Clicks on the Accordians for the Unit Costs page', () => {
        cy.get('.accordionContainer').scrollIntoView()
        cy.get('.accordion').contains('Accounting for multiple products and services').click()
        cy.get('.pricePerUnit-container').scrollIntoView()
        cy.get('#unitPrice').type(33)
        cy.get('[type="submit"]:visible').click()
      })

    it('Clicks on the Accordians for the Unit Sales page', () => {
        cy.get('.accordionContainer').scrollIntoView()
        cy.get('.accordion').contains('How to predict unit sales').click()
        cy.get('.unitSales-container').scrollIntoView()
        cy.get('#units').type(100)
        cy.get('[type="submit"]:visible').click()
      })

    it('Clicks on the Accordians for the Variable Costs page', () => {
        cy.get('.accordionContainer').scrollIntoView()
        cy.get('.accordion').contains('How to identify a fixed cost vs. a variable cost').click()
        cy.get('.accordion').contains('Considerations for semi-variable costs').click()
        cy.get('.variableCosts-container').scrollIntoView()
        cy.get('.variableCosts-container').contains('Yes').click().click()
        cy.get('#totalVariableCosts').type('15')
        cy.get('[type="submit"]:visible').click()
      })

    it('Clicks on the Accordians for the Results page', () => {
        cy.get('.accordionContainer').scrollIntoView()
        cy.get('.accordion').contains('How to reduce your break-even point').click()
        cy.get('.accordion').contains('Factors that increase the break-even point').click()
        cy.get('.graphContainer').scrollIntoView()
        cy.get('[data-testid=breakevenLabel]').should('be.visible')
      })
})