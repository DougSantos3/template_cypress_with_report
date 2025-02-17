import { createUserRequest } from '../requests/create_user'
import { loginRequest } from '../requests/login'
import { createProductRequest } from '../requests/create_product'
import { deleteProductRequest } from '../requests/delete_product'
import { searchProduct } from '../requests/search_product'

describe('Testing user creation flow, login, delete product', () => {
  it('create a product and delete it', () => {
    cy.generateRandomEmailAndPassword().then((userData) => {
      const email = userData.email
      const password = userData.password
      let authorization
      let productId

      createUserRequest(email, password)
        .then(() => loginRequest(email, password))
        .then(() => cy.get('@authorization'))
        .then((auth) => {
          authorization = auth
          return cy.generateRandomProduct()
        })
        .then((productData) =>
          createProductRequest(
            authorization,
            productData.nome,
            productData.preco,
            productData.descricao,
            productData.quantidade,
          ),
        )
        .then(() => cy.get('@productId'))
        .then((prodId) => {
          productId = prodId
          return searchProduct(productId)
        })
        .then((getProductResponse) =>
          deleteProductRequest(authorization, getProductResponse.body._id),
        )
        .then((deleteProductResponse) => {
          expect(deleteProductResponse.status).to.eq(200)
          expect(deleteProductResponse.body.message).to.eq(
            'Registro excluído com sucesso',
          )
        })
    })
  })
})
