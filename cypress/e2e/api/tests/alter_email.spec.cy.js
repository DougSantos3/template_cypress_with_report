import { createUserRequest } from '../requests/create_user'
import { searchProduct } from '../requests/search_user'
import { loginRequest } from '../requests/login'
import { updateUserEmailRequest } from '../requests/alter_user'

describe('Testing user creation flow, login, email change', () => {
  it('Change email', () => {
    cy.generateRandomEmailAndPassword().then((userData) => {
      const email = userData.email
      const password = userData.password
      let userId
      let authorization

      createUserRequest(email, password)
        .then(() => cy.get('@userId'))
        .then((id) => {
          userId = id
          return loginRequest(email, password)
        })
        .then(() => cy.get('@authorization'))
        .then((auth) => {
          authorization = auth
          const newEmail = `new_${email}`
          return updateUserEmailRequest(
            authorization,
            userId,
            newEmail,
            password,
          )
        })
        .then(() => {
          return searchProduct(userId)
        })
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.email).to.eq(`new_${email}`)
        })
    })
  })
})
