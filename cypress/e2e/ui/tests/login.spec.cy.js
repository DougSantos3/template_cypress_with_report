import { createUserRequest } from '../../api/requests/create_user'

describe('Login Page', () => {
  it('should log in successfully and show "Bem Vindo"', () => {
    cy.generateRandomEmailAndPassword().then((userData) => {
      const email = userData.email
      const password = userData.password

      createUserRequest(email, password).then(() => {
        cy.urlUI('login')
        cy.authenticationUI(email, password)
        cy.xpath('//h1[contains(text(), "Bem Vindo")]').should('be.visible')
      })
    })
  })
})
