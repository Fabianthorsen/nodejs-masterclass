/*
 * Create and export configuration variables
 */

// Container for all the environments
const environments = {};

// Staging (default) env
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging',
};

// Production env
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
};

// Determine which env was passed as a CLI argument
const currentEnv =
  typeof process.env.NODE_ENV == 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// Check that the current env is one of the environments, if not -> default to staging
const envToExport =
  typeof environments[currentEnv] == 'object'
    ? environments[currentEnv]
    : environments['staging'];

// Export module
module.exports = envToExport;
