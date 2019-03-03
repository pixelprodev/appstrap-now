const fs = require('fs')
const path = require('path')

function getFile (fileName) {
  path.join(process.cwd(), fileName)
}

function getConfig ({ loadEnv = false } = {}) {
  validateFiles({ loadEnv })
  const nowConfig = require(getFile('now.json'))
  if (loadEnv) {
    loadEnvironmentVariables({ nowConfig })
  }
  return {
    assets: getAssets({ nowConfig }),
    endpoints: getEndpoints({ nowConfig })
  }
}

function validateFiles ({ loadEnv }) {
  if (!fs.existsSync(getFile('now.json')) {
    throw new Error(`No now.json file found in directory ${process.cwd()}`)
  }
  if (loadEnv) {
    if (!fs.existsSync(getFile('now-secrets.json'))) {
      throw new Error(`Unable to load environment variables.  No now-secrets.json file found in directory ${process.cwd()}`)
    }
  }
}

function loadEnvironmentVariables ({ nowConfig }) {
  const nowSecrets = require(getFile('now-secrets.json'))
  nowConfig.env.forEach(key => {
    process.env[key] = nowSecrets[nowConfig[key]]
  })
}

function getAssets () {

}

function getEndpoints () {

}

module.exports = {
  getConfig,
  validateFiles,
  loadEnvironmentVariables,
  getAssets,
  getEndpoints
}
