import { faker } from '@faker-js/faker'
import 'cypress-xpath'

Cypress.Commands.add('urlUI', (path) => {
  cy.visit(`${Cypress.env('baseUrlFront')}/${String(path)}`)
})

Cypress.Commands.add('authenticationUI', (email, password) => {
  cy.get('[data-testid="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('[data-testid="entrar"]').click()
})

Cypress.Commands.add(
  'createUserUI',
  (name, email, password, clickOnTheAdministratorCheckbox = false) => {
    cy.get('[data-testid="cadastrar"]').click()
    cy.get('[data-testid="nome"]').type(name)
    cy.get('[data-testid="email"]').type(email)

    cy.get('input[data-testid="password"]').type(password)
    cy.get('[data-testid="cadastrar"]').click()

    if (clickOnTheAdministratorCheckbox) {
      cy.get('[data-testid="checkbox"]').click()
    }

    cy.get('button[type="submit"]').click()
  },
)

Cypress.Commands.add('createProductUI', (customProduct = {}) => {
  const productName = faker.commerce.productName()
  const randomNumber = faker.number.int({ min: 1, max: 999999 })

  const defaultProduct = {
    nome: `${productName}--${randomNumber}`,
    preco: faker.number.int({ min: 1, max: 10000000 }),
    descricao: `Descrição do ${productName}--${randomNumber}`,
    quantidade: faker.number.int({ min: 1, max: 10 }),
  }

  const product = { ...defaultProduct, ...customProduct }

  cy.get('[data-testid="cadastrarProdutos"]').click()

  if (product.nome) {
    cy.get('[data-testid="nome"]').type(product.nome)
  } else {
    cy.get('[data-testid="nome"]').clear()
  }

  if (product.descricao) {
    cy.get('[data-testid="descricao"]').type(product.descricao)
  } else {
    cy.get('[data-testid="descricao"]').clear()
  }

  cy.get('[data-testid="preco"]').type(product.preco.toString())
  cy.get('[data-testid="quantity"]').type(product.quantidade.toString())
  cy.get('button[data-testid^="cadastarProd"]').click()
})

Cypress.Commands.add('generateRandomProduct', () => {
  const productName = faker.commerce.productName()
  const randomNumber = faker.number.int({ min: 1, max: 999999 })
  return {
    nome: `${productName}--${randomNumber}`,
    preco: faker.number.int({ min: 1, max: 10000000 }),
    descricao: `Descrição do ${productName}--${randomNumber}`,
    quantidade: faker.number.int({ min: 1, max: 10 }),
  }
})

Cypress.Commands.add('generateRandomEmail', () => {
  return faker.internet.email()
})

Cypress.Commands.add('generateRandomPassword', () => {
  return faker.internet.password(7, true)
})

Cypress.Commands.add('generateRandomEmailAndPassword', () => {
  let userEmail

  return cy
    .generateRandomEmail()
    .then((randomEmail) => {
      userEmail = randomEmail
      return cy.generateRandomPassword()
    })
    .then((password) => {
      const userPassword = password
      return { email: userEmail, password: userPassword }
    })
})

Cypress.Commands.add('mockRegisterProduct', () => {
  cy.intercept('POST', 'produtos', {
    statusCode: 201,
    body: {
      message: 'Cadastro realizado com sucesso',
      id: '12345',
    },
  }).as('postCadastroProduto')

  cy.visit('')
  cy.get('[data-testid="nome"]').type('Nintendo Switch')
  cy.get('[data-testid="preco"]').type('50')
  cy.get('[data-testid="descricao"]').type('Video game com jogos do Mario')
  cy.get('[data-testid="submit"]').click()
})

Cypress.Commands.add('createUserAndLogin', (email, password) => {
  return createUserRequest(email, password)
    .then(() => loginRequest(email, password))
    .then(() => {
      cy.get('@authorization').as('authorization')
      cy.get('@userId').as('userId')
      return cy.get('@authorization')
    })
})

Cypress.Commands.add('createProduct', (authorization, product) => {
  return createProductRequest(authorization, product).then(() =>
    cy.get('@productId'),
  )
})

Cypress.Commands.add('createCart', (authorization, productId) => {
  return createCardRequest(authorization, productId).then(() =>
    cy.get('@cardId'),
  )
})

Cypress.Commands.add('deleteProduct', (authorization, productId) => {
  return searchProduct(productId).then((productResponse) =>
    deleteProductRequest(authorization, productResponse.body._id),
  )
})

Cypress.Commands.add(
  'updateUserEmail',
  (authorization, userId, newEmail, password) => {
    return updateUserEmailRequest(
      authorization,
      userId,
      newEmail,
      password,
    ).then(() => cy.get('@updatedUserId'))
  },
)
