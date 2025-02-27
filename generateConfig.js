require('dotenv').config()
const fs = require('fs')
const path = require('path')

const username = process.env.BROWSERSTACK_USERNAME
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY

if (!username || !accessKey) {
  console.error(
    'Erro: As variáveis de ambiente BROWSERSTACK_USERNAME e BROWSERSTACK_ACCESS_KEY não estão definidas.',
  )
  process.exit(1)
}

const browserstackConfig = {
  auth: {
    username: username,
    access_key: accessKey,
  },
  browsers: [
    {
      os: 'OS X Big Sur',
      browser: 'chrome',
      versions: ['latest'],
    },
  ],
  run_settings: {
    cypress_config_file: './cypress.config.js',
    nodeVersion: '20.16.0',
    cypress_version: '13.15.0',
    npm_dependencies: {
      cypress: '13.15.0',
      'browserstack-cypress-cli': '^1.32.4',
      'allure-cypress': '3.2.0',
      'cypress-postgres-10v-compatibility': '1.0.0',
      '@faker-js/faker': '^9.3.0',
      'cypress-xpath': '^2.0.1',
    },
    project_name: 'Cypress in ServeRest',
    build_name: 'Build no: 1',
    parallels: 1,
    exclude: ['some-folder/test.js', 'static/*.pdf'],
  },
  testObservability: true,
  browserstackAutomation: true,
  testObservabilityOptions: {
    projectName: 'Cypress in ServeRes',
    buildName: 'Build no: 1',
    buildTag: ['Custom Tag 1', 'Custom Tag 2'],
  },
}

const outputPath = path.join(__dirname, 'browserstack.json')

fs.writeFileSync(outputPath, JSON.stringify(browserstackConfig, null, 2))

console.log('Arquivo browserstack.json gerado com sucesso!')
