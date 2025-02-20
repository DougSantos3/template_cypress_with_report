const { defineConfig } = require('cypress')
const { allureCypress } = require('allure-cypress/reporter')
const cyPostgres = require('cypress-postgres-10v-compatibility')
const os = require('os')

const env = process.env.NODE_ENV || 'qa'

function getBaseUrls() {
  return {
    dev: {
      ui: 'https://example.url.dev',
      api: 'https://example.url.dev',
    },
    qa: {
      ui: 'https://front.serverest.dev',
      api: 'https://serverest.dev/',
    },
    prod: {
      ui: 'https://example.url.prod',
      api: 'https://example.url.prod',
    },
  }[env]
}

const baseUrls = getBaseUrls()

module.exports = defineConfig({
  experimentalWebKitSupport: true,
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
          environment: env,
          browser: config.browser,
        },
      })

      on('task', {
        dbQuery: (query) => cyPostgres(query.query, query.connection),
      })

      return config
    },
    baseUrl: baseUrls.api,
    browserStack: {
      project: 'Your Project Name',
      build: 'Your Build Name',
      timeout: 600, 
      retryWaitTime: 5000, 
    },
    env: {
      baseUrlFront: baseUrls.ui,
    },
    video: false,
    retries: {
      runMode: 0,
      openMode: 0,
    },
  },

  fixturesFolder: false,

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
