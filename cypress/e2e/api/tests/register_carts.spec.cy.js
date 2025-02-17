import { createUserRequest } from '../requests/create_user'
import { loginRequest } from '../requests/login'
import { createProductRequest } from '../requests/create_product'
import { createCardRequest } from '../requests/create_card'
import { getCartRequest } from '../requests/seach_card'

describe('Testing user creation flow, login, create cart', () => {
  it('Create cart', () => {
    cy.generateRandomEmailAndPassword().then((userData) => {
      const email = userData.email
      const password = userData.password
      let authorization
      let productId
      let cardId

      createUserRequest(email, password)
        .then(() => loginRequest(email, password))
        .then(() => cy.get('@authorization'))
        .then((auth) => {
          authorization = auth
          return cy.generateRandomProduct()
        })
        .then((productData) => {
          return createProductRequest(
            authorization,
            productData.nome,
            productData.preco,
            productData.descricao,
            productData.quantidade,
          )
        })
        .then(() => cy.get('@productId'))
        .then((prodId) => {
          productId = prodId
          return createCardRequest(authorization, productId)
        })
        .then(() => cy.get('@cardId'))
        .then((cartId) => {
          cardId = cartId

          return getCartRequest(cardId)
        })

        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('_id', cardId)
          expect(response.body.produtos[0].idProduto).to.eq(productId)
        })
    })
  })
})
