import { createUserRequest } from '../../api/requests/create_user'

describe('Products', () => {
  beforeEach(() => {
    cy.generateRandomEmailAndPassword().then((userData) => {
      const email = userData.email
      const password = userData.password

      createUserRequest(email, password).then(() => {
        cy.urlUI('login')
        cy.authenticationUI(email, password)
      })
    })
  })

  it('You must authenticate and register a product', () => {
    cy.createProductUI()

    cy.xpath('//h1[contains(text(), "Lista dos Produtos")]').should(
      'be.visible',
    )
  })

  it('Name is required', () => {
    cy.createProductUI({ nome: '' })

    cy.xpath('//span[contains(text(), "Nome é obrigatório")]').should(
      'be.visible',
    )
  })

  it('Description cannot be blank', () => {
    cy.createProductUI({ descricao: '' })

    cy.xpath('//span[contains(text(), "Descricao é obrigatório")]').should(
      'be.visible',
    )
  })
})
