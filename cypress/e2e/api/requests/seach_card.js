export const getCartRequest = (cartId) => {
  return cy.request({
    method: 'GET',
    url: `carrinhos/${cartId}`,
    headers: {
      Accept: 'application/json',
    },
  })
}
