export const searchProduct = (user_id) => {
  cy.request({
    method: 'GET',
    url: `usuarios/${user_id}`,
    headers: {
      Accept: 'application/json',
    },
  })
}
