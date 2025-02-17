import requestBodyUser from '../../../fixtures/user.json'

export const createUserRequest = (email, password) => {
  const userWithDynamicEmail = {
    ...requestBodyUser,
    email: email,
    password: password,
  }

  return cy
    .request({
      method: 'POST',
      url: 'usuarios',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: userWithDynamicEmail,
    })
    .then((response) => {
      const userId = response.body._id
      cy.wrap(userId).as('userId')
    })
}
