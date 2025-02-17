export const createProductRequest = (
  authorization,
  name,
  price,
  description,
  quantidy,
) => {
  const requestBody = {
    nome: name,
    preco: price,
    descricao: description,
    quantidade: quantidy,
  }

  return cy
    .request({
      method: 'POST',
      url: 'produtos',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: authorization,
      },
      body: requestBody,
    })
    .then((response) => {
      const productId = response.body._id
      cy.wrap(productId).as('productId')
    })
}
