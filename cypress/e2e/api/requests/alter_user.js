import requestBodyUser from '../../../fixtures/user.json'

export const updateUserEmailRequest = (
  authorization,
  userId,
  newEmail,
  password,
) => {
  return cy
    .request({
      method: 'PUT',
      url: `usuarios/${userId}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: authorization,
      },
      body: {
        ...requestBodyUser,
        email: newEmail,
        password: password,
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Registro alterado com sucesso')
      cy.wrap(response.body._id).as('updatedUserId')
    })
}
