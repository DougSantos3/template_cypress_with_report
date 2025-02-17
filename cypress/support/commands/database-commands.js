Cypress.Commands.add('insert', (name, age, designation, salary) => {
  const query =
    'INSERT INTO example_table(name, age, designation, salary) VALUES ($1, $2, $3, $4)'
  const values = [name, age, designation, salary]
  cy.runSQL(query, values)
})

Cypress.Commands.add('selectByName', (name) => {
  const query = 'SELECT * FROM example_table WHERE name = $1'
  cy.runSQL(query, [name])
})

Cypress.Commands.add('selectAll', () => {
  cy.runSQL('SELECT * FROM example_table')
})

Cypress.Commands.add('updateExample', (name, designation) => {
  const query = 'UPDATE example_table SET designation = $1 WHERE name = $2'
  cy.runSQL(query, [designation, name])
})

Cypress.Commands.add('deleteExample', (id) => {
  const query = 'DELETE FROM example_table WHERE id = $1'
  cy.runSQL(query, [id]).then(() => {
    cy.log('Table row deleted')
  })
})
