describe('Testing user creation', () => {
  beforeEach(() => {
    cy.urlUI('login')
  })

  it('You must create a user without administrative access', () => {
    cy.generateRandomEmailAndPassword().then((userData) => {
      cy.createUserUI('Nome aleatorio', userData.email, userData.password)
      cy.xpath('//h1[contains(text(), "Serverest Store")]').should('be.visible')
    })
  })

  it('You must create a user with administrative access', () => {
    cy.generateRandomEmailAndPassword().then((userData) => {
      cy.createUserUI('Nome aleatorio', userData.email, userData.password, true)
      cy.xpath('//h1[contains(text(), "Serverest Store")]').should('be.visible')
    })
  })
})
