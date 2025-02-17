export const createCardRequest = (authorization, productId) => {
  return cy
    .request({
      method: 'POST',
      url: 'carrinhos',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: authorization,
      },
      body: {
        produtos: [
          {
            idProduto: productId,
            quantidade: 1,
          },
        ],
      },
    })
    .then((response) => {
      const cardId = response.body._id
      cy.wrap(cardId).as('cardId')
    })
}
