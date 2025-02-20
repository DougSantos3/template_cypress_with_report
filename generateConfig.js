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
  auth: { username: username, access_key: accessKey },
  browsers: [
    {
      os: 'OS X Big Sur',
      browser: 'chrome',
      versions: ['latest', 'latest-1', 'latest-2'],
    },
    {
      os: 'OS X Catalina',
      browser: 'edge',
      versions: ['latest', 'latest-1', 'latest-2'],
    },
    {
      os: 'OS X Catalina',
      browser: 'firefox',
      versions: ['latest', 'latest-1', 'latest-2'],
    },
    {
      os: 'OS X Big Sur',
      browser: 'webkit',
      versions: ['latest', 'latest-1', 'latest-2'],
    },
    {
      os: 'Windows 10',
      browser: 'chrome',
      versions: ['latest', 'latest-1', 'latest-2'],
    },
    {
      os: 'Windows 11',
      browser: 'edge',
      versions: ['latest', 'latest-1', 'latest-2'],
    },
    {
      os: 'Windows 11',
      browser: 'firefox',
      versions: ['latest', 'latest-1', 'latest-2'],
    },
  ],
  run_settings: {
    cypress_config_file: './cypress.config.js',
    cypress_version: '13.15.0',
    npm_dependencies: {
      cypress: '13.15.0',
      'browserstack-cypress-cli': '^1.32.4',
    },
    project_name: 'Cypress in ServeRest',
    build_name: 'Build no: 1',
    parallels: 5,
    exclude: ['some-folder/test.js', 'static/*.pdf'],
  },
}

const outputPath = path.join(__dirname, 'browserstack.json')

fs.writeFileSync(outputPath, JSON.stringify(browserstackConfig, null, 2))

console.log('Arquivo browserstack.json gerado com sucesso!')
