export const loginRequest = (email, password) => {
  return cy
    .request({
      method: 'POST',
      url: 'login',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: {
        email,
        password,
      },
    })
    .then((response) => {
      const authorization = response.body.authorization
      cy.wrap(authorization).as('authorization')
    })
}
