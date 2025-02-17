export const listAllRegisteredUsers = (
  email,
  password,
  administrador = true,
) => {
  const queryParams = {
    _id: '7',
    nome: 'Teste Souza Silva',
    email: email,
    password: password,
    administrador: administrador,
  }

  return cy.request({
    method: 'GET',
    url: 'usuarios',
    qs: queryParams,
    headers: {
      Accept: 'application/json',
    },
  })
}
