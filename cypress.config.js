const { defineConfig } = require('cypress')
const { allureCypress } = require('allure-cypress/reporter')
const cyPostgres = require('cypress-postgres-10v-compatibility')
const os = require('os')
const browserstackTestObservabilityPlugin = require('browserstack-cypress-cli/bin/testObservability/plugin')

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
      config.env.allureInitialized = false
      if (allureCypress && !process.env.BROWSERSTACK) {
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
        config.env.allureInitialized = true

        on('task', {
          reportAllureCypressSpecMessages: () => {
            return null
          },
          dbQuery: (query) => cyPostgres(query.query, query.connection),
        })
      } else {
        on('task', {
          dbQuery: (query) => cyPostgres(query.query, query.connection),
        })
      }

      browserstackTestObservabilityPlugin(on, config)

      on('before:run', (details) => {
        console.log('Running tests with the following details:', details)
      })

      on('after:run', (results) => {
        console.log(
          'Finished running tests with the following results:',
          results,
        )
      })

      return config
    },
    baseUrl: baseUrls.api,
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
