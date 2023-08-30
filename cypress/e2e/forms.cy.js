describe('Form tests', () => {
    beforeEach(() => {
        cy.visit('/forms')
    })
    it('Test subscribe form', () => {
        cy.contains(/testing forms/i)
        cy.getDataTest('subscribe-form').find('input').as('subscribe-input')
        cy.get('@subscribe-input').type('mail@something.com')
        cy.contains(/Successfully subbed: mail@something.com!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Successfully subbed: mail@something.com!/i).should('exist')
        cy.wait(3000)
        cy.contains(/Successfully subbed: mail@something.com!/i).should('not.exist')

        cy.get('@subscribe-input').type('mail@something.net')
        cy.contains(/invalid email: mail@something.net!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/invalid email: mail@something.net!/i).should('exist')
        cy.wait(3000)
        cy.contains(/invalid email: mail@something.net!/i).should('not.exist')

        cy.contains(/fail!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/fail!/i).should('exist')
    })
})